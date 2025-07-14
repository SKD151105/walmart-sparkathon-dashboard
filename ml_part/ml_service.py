from flask import Flask, jsonify
import pandas as pd
import joblib
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64
from tensorflow.keras.models import load_model
import numpy as np
from datetime import datetime, timedelta
import os

app = Flask(__name__)

# Load scalers
scaler_uni = joblib.load("scaler.pkl")
scaler_multi = joblib.load("scaler_multivariate.pkl")

# Define product categories
category_models = {
    "Total Sales": {
        "model": "model2.keras",
        "csv": "daily_demand.csv",
        "column": "Units Sold",
        "multivariate": False
    },
    "Clothing": {
        "model": "clothing.keras",
        "csv": "products_sold.csv",
        "column": "Units Sold_Clothing",
        "multivariate": True
    },
    "Electronics": {
        "model": "electronics.keras",
        "csv": "products_sold.csv",
        "column": "Units Sold_Electronics",
        "multivariate": True
    },
    "Furniture": {
        "model": "furniture.keras",
        "csv": "products_sold.csv",
        "column": "Units Sold_Furniture",
        "multivariate": True
    },
    "Groceries": {
        "model": "groceries.keras",
        "csv": "products_sold.csv",
        "column": "Units Sold_Groceries",
        "multivariate": True
    },
    "Toys": {
        "model": "toys.keras",
        "csv": "products_sold.csv",
        "column": "Units Sold_Toys",
        "multivariate": True
    }
}

# Forecast logic
def forecast_7_days(model_path, csv_path, column_name, multivariate):
    model = load_model(model_path)
    df = pd.read_csv(csv_path)

    if 'Date' in df.columns:
        last_date = pd.to_datetime(df['Date'].iloc[-1])
    else:
        last_date = datetime.today()

    if multivariate:
        features = [
            "Units Sold_Clothing",
            "Units Sold_Electronics",
            "Units Sold_Furniture",
            "Units Sold_Groceries",
            "Units Sold_Toys"
        ]
        window_size = 7
        data = df[features].dropna().values
        last_sequence = data[-window_size:]
        if last_sequence.shape != (7, 5):
            raise ValueError("Insufficient data for multivariate shape (7, 5)")
        scaled_seq = scaler_multi.transform(last_sequence)
        input_val = scaled_seq.reshape(1, 7, 5)

        predictions = []
        for _ in range(7):
            pred_scaled = model.predict(input_val, verbose=0)[0][0]

            # Build dummy input to inverse scale
            dummy_input = np.zeros((1, 5))
            idx = features.index(column_name)
            dummy_input[0, idx] = pred_scaled
            pred_unscaled = scaler_multi.inverse_transform(dummy_input)[0][idx]

            predictions.append(pred_unscaled)

            # Append prediction to sequence
            new_scaled = np.zeros((1, 5))
            new_scaled[0, idx] = pred_scaled
            input_val = np.append(input_val[:, 1:, :], new_scaled.reshape(1, 1, 5), axis=1)

        last_val = df[column_name].dropna().iloc[-1]
        all_values = [last_val] + predictions

    else:
        last_val = df[column_name].dropna().iloc[-1]
        input_val = scaler_uni.transform(np.array([[last_val]]))
        predictions = []

        for _ in range(7):
            pred_scaled = model.predict(input_val, verbose=0)[0][0]
            pred_unscaled = scaler_uni.inverse_transform([[pred_scaled]])[0][0]
            predictions.append(pred_unscaled)
            input_val = scaler_uni.transform([[pred_unscaled]])

        all_values = [last_val] + predictions

    all_dates = [(last_date + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(8)]

    # Plotting
    plt.figure(figsize=(10, 4))
    plt.plot(all_dates, all_values, marker='o', label=column_name)
    plt.title(f"7-Day Forecast: {column_name}")
    plt.xlabel("Date")
    plt.ylabel("Units Sold")
    plt.xticks(rotation=45)
    plt.legend()
    plt.tight_layout()
    plt.grid(True)

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    encoded = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    plt.close()
    return encoded

# API endpoint
@app.route('/predict_category_forecasts', methods=['POST'])
def predict_category_forecasts():
    try:
        images = {}
        for category, config in category_models.items():
            print(f"📈 Generating plot for {category}")
            image_b64 = forecast_7_days(
                config["model"],
                config["csv"],
                config["column"],
                config["multivariate"]
            )
            images[category] = image_b64
        return jsonify(images)
    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
