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

# Load model and scaler
model = load_model("model2.keras")
scaler = joblib.load("scaler.pkl")

@app.route('/predict_7day_forecast', methods=['POST'])
def predict_next_7_days():
    try:
        # Load data
        df = pd.read_csv("daily_demand.csv")

        # Parse last date in dataset
        if 'Date' in df.columns:
            last_date_str = df['Date'].iloc[-1]
            last_date = pd.to_datetime(last_date_str)
        else:
            last_date = datetime.today()

        # Get last known actual sales
        last_units_sold = df['Units Sold'].iloc[-1]
        true_values = [last_units_sold]

        # Prepare input
        input_val = scaler.transform(np.array([[last_units_sold]]))
        predictions = []

        for _ in range(7):
            pred_scaled = model.predict(input_val, verbose=0)[0][0]
            pred_unscaled = scaler.inverse_transform([[pred_scaled]])[0][0]
            predictions.append(pred_unscaled)
            input_val = scaler.transform([[pred_unscaled]])

        # Create full forecast series
        all_values = true_values + predictions
        all_dates = [(last_date + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(8)]

        # Plot
        plt.figure(figsize=(10, 4))
        plt.plot(all_dates, all_values, marker='o', color='blue', label='Units Sold (Actual + Forecast)')
        plt.title("7-Day Demand Forecast")
        plt.xlabel("Date")
        plt.ylabel("Units Sold")
        plt.xticks(rotation=45)
        plt.grid(True)
        plt.tight_layout()
        plt.legend()

        # Convert to base64
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        base64_image = base64.b64encode(buf.read()).decode('utf-8')
        buf.close()
        plt.close()

        print("✅ Forecast plot with dates generated.")
        return jsonify({"image": base64_image})

    except Exception as e:
        print("❌ Error in prediction:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
