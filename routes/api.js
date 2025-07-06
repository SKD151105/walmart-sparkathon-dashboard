const express = require('express');
const router = express.Router();

// Sample forecast data (dates + predicted inventory values)
router.get('/forecast', (req, res) => {
    const forecast = {
        dates: ["2025-07-06", "2025-07-07", "2025-07-08", "2025-07-09", "2025-07-10"],
        values: [420, 460, 390, 510, 475]
    };
    res.json(forecast);
});

// Sample monthly sales data
router.get('/sales-trend', (req, res) => {
    const trend = {
        months: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        sales: [1000, 1350, 1250, 1600, 1400, 1800]
    };
    res.json(trend);
});

// Sample alerts based on predictions/festivals
router.get('/alerts', (req, res) => {
    const alerts = [
        { message: "📉 Low stock predicted for Item A by July 10." },
        { message: "🎉 Expect surge in demand during Raksha Bandhan." },
        { message: "🛒 Overstock risk for Item B – reduce restocking next week." }
    ];
    res.json(alerts);
});

module.exports = router;
