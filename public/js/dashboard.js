document.addEventListener("DOMContentLoaded", () => {
    fetchForecastData();
    fetchSalesTrendData();
    fetchAlerts();
});

function fetchForecastData() {
    fetch("/api/forecast")
        .then((res) => res.json())
        .then((data) => {
            renderForecastChart(data);
        })
        .catch((err) => console.error("Error loading forecast data:", err));
}

function renderForecastChart(data) {
    const ctx = document.getElementById("forecastChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: data.dates,
            datasets: [{
                label: "Predicted Inventory",
                data: data.values,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function fetchSalesTrendData() {
    fetch("/api/sales-trend")
        .then((res) => res.json())
        .then((data) => {
            renderSalesTrendChart(data);
        })
        .catch((err) => console.error("Error loading sales trend data:", err));
}

function renderSalesTrendChart(data) {
    const ctx = document.getElementById("salesTrendChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.months,
            datasets: [{
                label: "Monthly Sales",
                data: data.sales,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function fetchAlerts() {
    fetch("/api/alerts")
        .then((res) => res.json())
        .then((alerts) => {
            const box = document.getElementById("alertsBox");
            box.innerHTML = "";

            if (alerts.length === 0) {
                box.innerHTML = "<p>No alerts at the moment.</p>";
                return;
            }

            alerts.forEach((alert) => {
                const div = document.createElement("div");
                div.className = "alert-warning";
                div.innerText = alert.message;
                box.appendChild(div);
            });
        })
        .catch((err) => console.error("Error loading alerts:", err));
}
