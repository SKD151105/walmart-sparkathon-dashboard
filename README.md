# 🛍️ SmartRetail — AI-Powered Inventory Forecast Dashboard

**SmartRetail** is an intelligent web-based dashboard designed to help retailers like Walmart make smarter inventory and supply chain decisions using **AI-driven demand forecasting**, **real-time inventory insights**, and **event-aware planning**.

Built for the **Walmart Sparkathon 2025**, this project leverages the power of machine learning, data visualization, and modern web technologies to deliver a comprehensive inventory management experience.

---

## 🎯 Goal & Problem Statement

Traditional inventory systems are often reactive and unable to account for external variables such as holidays or seasonal trends. Our goal with SmartRetail is to **reimagine the retail supply chain** by:

- Forecasting demand accurately using AI
- Visualizing critical sales and inventory KPIs in one place
- Making the system secure, scalable, and easy to use
- Helping managers take **proactive** actions based on data

> 🧠 Example: If the model predicts a spike in sales for "Dairy Products" next week due to a festival, the dashboard will suggest timely restocking in advance.

---

## 🚀 Features

- 🔐 **Secure Login System** for admins (with approved Walmart IDs)
- 📈 **AI Forecast Engine** (7-day demand prediction per category)
- 📦 **Inventory Overview**: Real-time inventory & restocking needs
- 📊 **Dynamic Charts**: Sales trends, category-wise breakdowns
- 📆 **Event-Aware Planning**: Forecasts that factor in holidays, trends
- 📥 **Smart Restocking Alerts** with visual indicators
- 🌐 **Modern Web Dashboard** UI (fully responsive)

---

## 🛠️ Tech Stack

### ⚙ Backend
- Node.js + Express.js
- Passport.js for authentication (LocalStrategy + bcrypt)
- PostgreSQL for storage
- Flask (Python) for ML inference

### 🧠 Machine Learning
- TensorFlow & Keras
- Pandas for preprocessing
- Matplotlib for plotting
- Event-aware 7-day forecast per category

### 🌐 Frontend
- EJS (Templating)
- Vanilla JavaScript + CSS
- Chart.js and Matplotlib charts

---

## 📁 Folder Structure

```
walmart-sparkathon-dashboard/
├── app.js                  # Main Express app
├── public/                 # Static assets (CSS, icons, videos)
├── views/                  # EJS frontend templates
│   └── partials/           # Shared UI components
├── ml_part/                # Flask ML service
│   └── ml_service.py
├── queries.sql             # PostgreSQL schema and seed data
├── .env.example            # Sample environment variables
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/walmart-sparkathon-dashboard.git
cd walmart-sparkathon-dashboard
```

### 2. Install Node Dependencies

```bash
npm install
```

### 3. Setup PostgreSQL

Create a database:

```sql
CREATE DATABASE walmartDb;
```

Then execute the SQL in `queries.sql` to create tables and seed test data.

### 4. Configure Environment Variables

Create a `.env` file using the template below:

```env
SESSION_SECRET=your_secret_key
PG_USER=your_pg_user
PG_HOST=localhost
PG_DATABASE=walmartDb
PG_PASSWORD=your_pg_password
PG_PORT=5432
```

### 5. Run ML Microservice

```bash
cd ml_part
python ml_service.py
```

### 6. Start Node.js Server

```bash
node app.js
# or
nodemon app.js
```

App will be live at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Test Admin IDs

You can use any of these pre-approved Walmart IDs to register/login:

```
W-00001
W-00010
W-00011
W-00100
W-00101
```

---

## 📊 Dashboard Sections

- **Dashboard**: Summary cards for profit, sales, views, and clients
- **Inventory**: Current stock, 7-day demand, restock need, coverage %
- **Analysis**: Time-series forecast (7-day) per category
- **Charts**: Latest sales by category (bar/pie charts)
- **Suggestions/Feedback**: Submit ideas or issues

---

## 👥 Contributors

- Ajinkya Joshi  
- Shubham Das  
- Chataniya Dhanai
- Gurmeet Singh Jabbal

---

## 📄 License

This project is developed for **Walmart Sparkathon 2025**.  
For demo and educational purposes only.
