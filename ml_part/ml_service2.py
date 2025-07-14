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

# -- Configuration --------------------------------------------------
# Rename your uploaded files to these names, placed next to this script
MODEL_FILES = {
    'model1': 'clothing.keras',
    'model2': 'electronics.keras',
    'model3': 'furniture.keras',
    'model4': 'groceries.keras',
    'model5': 'toys.keras',
}
SCALER_FILE = 'scaler2.pkl'
DATA_FILE   = 'products-sold.csv'
FORECAST_DAYS = 7

# -- Load models and scaler at startup --------------------------------
models = {key: load_model(path) for key, path in MODEL_FILES.items()}
scaler = joblib.load(SCALER_FILE)

# -- Forecast helper ---------------------------------------------------
def make_forecast(model, scaler, last_val, start_date, days=FORECAST_DAYS):
    # Rolling forecast for `days`, returns dates + values
    preds = []
    input_val = scaler.transform([[last_val]])
    true_vals = [last_val]

    for _ in range(days):
        out_scaled = model.predict(input_val, verbose=0)[0][0]
        out = scaler.inverse_transform([[out_scaled]])[0][0]
        preds.append(out)
        input_val = scaler.transform([[out]])

    dates = [(start_date + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(days + 1)]
    values = true_vals + preds
    return dates, values

# -- Endpoint: Bulk predict and plot ------------------------------------
@app.route('/predict_bulk', methods=['POST'])
def predict_bulk():
    try:
        # Load historical data
        df = pd.read_csv(DATA_FILE)
        if 'Date' in df.columns:
            last_date = pd.to_datetime(df['Date'].iloc[-1])
        else:
            last_date = datetime.today()
        last_units = df['Units Sold'].iloc[-1]

        images = {}

        # Generate and encode one plot per model
        for key, model in models.items():
            dates, values = make_forecast(model, scaler, last_units, last_date, FORECAST_DAYS)

            # Plot line chart
            plt.figure(figsize=(8, 4))
            plt.plot(dates, values, marker='o', label=f'{key} Actual + Forecast')
            plt.title(f'7-Day Forecast: {key}')
            plt.xlabel('Date')
            plt.ylabel('Units Sold')
            plt.xticks(rotation=45)
            plt.tight_layout()
            plt.legend()

            # Encode to base64 string
            buf = io.BytesIO()
            plt.savefig(buf, format='png')
            plt.close()
            buf.seek(0)
            img64 = base64.b64encode(buf.read()).decode('utf-8')
            buf.close()

            images[key] = img64

        return jsonify({'images': images})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5002)
