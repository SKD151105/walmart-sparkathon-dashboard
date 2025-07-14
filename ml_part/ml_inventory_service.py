import matplotlib
matplotlib.use('Agg')

from flask import Flask, jsonify
import pandas as pd
import joblib
import numpy as np
from tensorflow.keras.models import load_model
from datetime import datetime

app = Flask(__name__)

# === Load Scalers ===
scaler_multivariate = joblib.load("scaler_multivariate.pkl")

# === Category Model Config ===
category_models = {
    "Clothing": ("clothing.keras", "Units Sold_Clothing"),
    "Electronics": ("electronics.keras", "Units Sold_Electronics"),
    "Furniture": ("furniture.keras", "Units Sold_Furniture"),
    "Groceries": ("groceries.keras", "Units Sold_Groceries"),
    "Toys": ("toys.keras", "Units Sold_Toys")
}

# === Load Dataset ===
df_inventory = pd.read_csv("detailed_inventory.csv")
df_sales = pd.read_csv("products_sold.csv")

# === Load Models ===
loaded_models = {cat: load_model(path) for cat, (path, _) in category_models.items()}

# === Forecast Function ===
def forecast_7_days_multivariate(model, df, target_col):
    # Use the same columns and order used during scaler training
    expected_cols = scaler_multivariate.feature_names_in_
    input_seq = df[expected_cols].tail(7)
    input_scaled = scaler_multivariate.transform(input_seq)
    input_val = input_scaled.reshape(1, 7, -1)

    forecasted = 0
    for _ in range(7):
        pred_scaled = model.predict(input_val, verbose=0)[0][0]
        pred_vector = [pred_scaled] + [0] * (input_val.shape[2] - 1)
        pred_unscaled = scaler_multivariate.inverse_transform([pred_vector])[0][0]
        forecasted += pred_unscaled

        next_step = input_val[0][1:]
        next_vector = scaler_multivariate.transform([pred_vector])[0]
        input_val = np.append(next_step, [next_vector], axis=0).reshape(1, 7, -1)

    return round(forecasted)



@app.route("/inventory_status", methods=["POST"])
def inventory_status():
    try:
        result = {}

        for category, (model_path, col_name) in category_models.items():
            model = loaded_models[category]
            recent_inventory_row = df_inventory[df_inventory["Category"] == category].sort_values("Date").iloc[-1]
            current_inventory = int(recent_inventory_row["Inventory Level"])

            forecast_demand = forecast_7_days_multivariate(model, df_sales, col_name)
            restock_needed = max(forecast_demand - current_inventory, 0)
            percent_remaining = min(round((current_inventory / forecast_demand) * 100), 100) if forecast_demand > 0 else 100

            result[category] = {
                "inventory": current_inventory,
                "forecast": forecast_demand,
                "percent_remaining": percent_remaining,
                "restock_needed": restock_needed
            }

        return jsonify(result)

    except Exception as e:
        print("❌ Inventory Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5002)
