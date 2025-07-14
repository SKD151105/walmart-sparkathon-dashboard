import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import joblib

# Step 1: Load your dataset
df = pd.read_csv("products_sold.csv")

# Step 2: Select only the columns your LSTM model was trained on
multivariate_columns = [
    "Units Sold_Groceries",
    "Units Sold_Clothing",
    "Units Sold_Electronics",
    "Units Sold_Furniture",
    "Units Sold_Toys"
]

# Step 3: Fit the scaler
scaler = MinMaxScaler()
scaler.fit(df[multivariate_columns])

# Step 4: Save the scaler
joblib.dump(scaler, "scaler_multivariate.pkl")
print("✅ scaler_multivariate.pkl saved successfully.")
