import matplotlib
matplotlib.use('Agg')

from flask import Flask, jsonify
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)

# Preload CSVs
category_sales_df = pd.read_csv('products_sold.csv')


def generate_category_bar():
    # Get last row
    last_row = category_sales_df.tail(1).squeeze()

    # Drop the date column
    last_row = last_row.iloc[1:]  # Skip first col (Date)

    plt.figure(figsize=(10, 4))
    last_row.plot(kind='bar', color='skyblue')
    plt.title("Latest Category Sales")
    plt.xlabel("Category")
    plt.ylabel("Units Sold")
    plt.xticks(rotation=45)
    plt.tight_layout()

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    encoded = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    plt.close()
    return encoded


def generate_demand_pie():
    last_row = category_sales_df.tail(1).squeeze()
    last_row = last_row.iloc[1:]  # only skip Date

    plt.figure(figsize=(2, 2))  # smaller
    last_row.plot(kind='pie',
                  autopct='%1.1f%%',
                  startangle=90,
                  colors=['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#845EC2'])
    plt.title("Latest Product Demand Distribution", color='white')
    plt.ylabel('')

    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', pad_inches=0.05)
    buf.seek(0)
    encoded = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    plt.close()
    return encoded



@app.route('/generate_charts', methods=['POST'])
def generate_charts():
    try:
        print("Reading last row from category_sales_df:\n", category_sales_df.tail(1))
        print("Reading last row from daily_demand_df:\n", category_sales_df.tail(1))

        bar_image = generate_category_bar()
        pie_image = generate_demand_pie()

        return jsonify({
            "barChart": bar_image,
            "pieChart": pie_image
        })

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5003)
