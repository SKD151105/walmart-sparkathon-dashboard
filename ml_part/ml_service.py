from flask import Flask, jsonify
import pandas as pd
import joblib
import matplotlib.pyplot as plt
import io
import base64
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)

model = load_model("model2.keras")
scaler = joblib.load("scaler.pkl")

@app.route('/predict_7day_forecast', methods=['POST'])
def predict_next_7_days():
    try:
        df = pd.read_csv("daily_demand.csv")
        last_units_sold = df['Units Sold'].iloc[-1]
        input_val = np.array([[last_units_sold]])

        predictions = []
        for _ in range(7):
            scaled = scaler.transform(input_val)
            pred = model.predict(scaled)[0][0]
            predictions.append(pred)
            input_val = np.array([[pred]])

        # Plot
        days = [f'Day {i+1}' for i in range(7)]
        plt.figure(figsize=(10, 4))
        plt.plot(days, predictions, marker='o', color='blue', label='Forecasted Units Sold')
        plt.title("7-Day Demand Forecast")
        plt.xlabel("Upcoming Days")
        plt.ylabel("Units Sold")
        plt.grid(True)
        plt.legend()

        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        base64_image = base64.b64encode(buf.read()).decode('utf-8')
        buf.close()
        plt.close()

        return jsonify({"image": base64_image})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
