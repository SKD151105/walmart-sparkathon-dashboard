import matplotlib
matplotlib.use('Agg')

from flask import Flask, jsonify
import pandas as pd
import joblib
import matplotlib.pyplot as plt
import io
import base64
from tensorflow.keras.models import load_model
import numpy as np
from datetime import datetime, timedelta

app = Flask(__name__)

# Load scalers
scaler_univariate = joblib.load("scaler.pkl")
scaler_multivariate = joblib.load("scaler_multivariate.pkl")

# Category configurations
category_models = {
    "Total Sales": ("model2.keras", "daily_demand.csv", "Units Sold", "univariate"),
    "Clothing": ("clothing.keras", "products_sold.csv", "Units Sold_Clothing", "multivariate"),
    "Electronics": ("electronics.keras", "products_sold.csv", "Units Sold_Electronics", "multivariate"),
    "Furniture": ("furniture.keras", "products_sold.csv", "Units Sold_Furniture", "multivariate"),
    "Groceries": ("groceries.keras", "products_sold.csv", "Units Sold_Groceries", "multivariate"),
    "Toys": ("toys.keras", "products_sold.csv", "Units Sold_Toys", "multivariate")
}

# Preload models and data
loaded_models = {cat: load_model(path) for cat, (path, _, _, _) in category_models.items()}
loaded_dataframes = {
    "daily_demand.csv": pd.read_csv("daily_demand.csv"),
    "products_sold.csv": pd.read_csv("products_sold.csv")
}

def forecast_7_days(model, df, column_name, scaler, mode):
    if 'Date' in df.columns:
        last_date = pd.to_datetime(df['Date'].iloc[-1])
    else:
        last_date = datetime.today()

    if mode == 'univariate':
        last_val = df[column_name].dropna().iloc[-1]
        input_val = scaler.transform([[last_val]])
        predictions = []

        for _ in range(7):
            pred_scaled = model.predict(input_val, verbose=0)[0][0]
            pred_unscaled = scaler.inverse_transform([[pred_scaled]])[0][0]
            predictions.append(pred_unscaled)
            input_val = scaler.transform([[pred_unscaled]])

        all_values = [last_val] + predictions

    else:  # multivariate
        expected_columns = scaler.feature_names_in_
        input_seq = df[expected_columns].tail(7)
        input_scaled = scaler.transform(input_seq)
        input_val = input_scaled.reshape(1, 7, -1)

        predictions = []
        for _ in range(7):
            pred_scaled = model.predict(input_val, verbose=0)[0][0]

            pred_vector = np.zeros((1, len(expected_columns)))
            pred_vector[0, list(expected_columns).index(column_name)] = pred_scaled
            pred_unscaled = scaler.inverse_transform(pred_vector)[0, list(expected_columns).index(column_name)]
            predictions.append(pred_unscaled)

            # Slide window
            new_step = input_val[0][1:].copy()
            new_step = np.vstack([new_step, pred_vector])
            input_val = new_step.reshape(1, 7, -1)

        last_val = df[column_name].dropna().iloc[-1]
        all_values = [last_val] + predictions

    all_dates = [(last_date + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(8)]

    plt.figure(figsize=(10, 4))
    plt.plot(all_dates, all_values, marker='o', label=column_name)
    plt.title(f"7-Day Forecast: {column_name}")
    plt.xlabel("Date")
    plt.ylabel("Units Sold")
    plt.xticks(rotation=45)
    plt.grid(True)
    plt.legend()
    plt.tight_layout()

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    encoded = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    plt.close()
    return encoded

@app.route('/predict_category_forecasts', methods=['POST'])
def predict_category_forecasts():
    try:
        result = {"total": None, "categories": {}}
        for category, (model_path, csv_file, column_name, mode) in category_models.items():
            print(f"📈 Generating plot for {category}")
            model = loaded_models[category]
            df = loaded_dataframes[csv_file]
            scaler = scaler_univariate if mode == "univariate" else scaler_multivariate
            image = forecast_7_days(model, df, column_name, scaler, mode)

            if category == "Total Sales":
                result["total"] = image
            else:
                result["categories"][category] = image

        return jsonify(result)

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
