import matplotlib
matplotlib.use('Agg')

from flask import Flask, jsonify
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)

# Preload CSV
category_sales_df = pd.read_csv('detailed_inventory.csv')

def generate_last_20_table():
    # Take last 20 rows
    last_20 = category_sales_df.tail(20)
    last_20 = last_20.iloc[:, 1:]

    # Create figure and axis
    fig, ax = plt.subplots(figsize=(12, 6))
    ax.axis('tight')
    ax.axis('off')

    # Create table
    table = ax.table(cellText=last_20.values,
                     colLabels=last_20.columns,
                     cellLoc='center',
                     loc='center')

    table.auto_set_font_size(False)
    table.set_fontsize(8)
    table.scale(1, 1.5)

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
        print("Reading last 20 rows from category_sales_df:\n", category_sales_df.tail(20))
        table_image = generate_last_20_table()

        return jsonify({
            "tableImage": table_image
        })

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5004)