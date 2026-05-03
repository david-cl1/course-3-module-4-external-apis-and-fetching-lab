// index.js
//const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// index.js

function fetchWeatherAlerts() {
    const stateInput = document.getElementById("state-input");
    const errorElement = document.getElementById("error-message");
    const alertsDisplay = document.getElementById("alerts-display");

    const state = stateInput.value.trim().toUpperCase();
    errorElement.textContent = "";
    errorElement.classList.add("hidden");
    alertsDisplay.innerHTML = "";

    if (state.length !== 2) {
        displayError("Please enter a valid 2-letter state abbreviation (e.g., TX).");
        return;
    }

    const weatherApi = `https://api.weather.gov/alerts/active?area=${state}`;

    fetch(weatherApi)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch weather data. Please check the state code.");
            }
            return response.json();
        })
        .then(data => {
            stateInput.value = "";
            displayAlerts(data);
        })
        .catch((errorObject) => {
            displayError(errorObject.message);
        });
}

function displayAlerts(data) {
    const alertsDisplay = document.getElementById("alerts-display");

    const summary = document.createElement("h3");
    const count = data.features.length;
    summary.textContent = `${data.title}: ${count}`;
    alertsDisplay.appendChild(summary);

    if (count > 0) {
        const ul = document.createElement("ul");
        data.features.forEach(alert => {
            const li = document.createElement("li");
            li.textContent = alert.properties.headline;
            ul.appendChild(li);
        });
        alertsDisplay.appendChild(ul);
    } else {
        const p = document.createElement("p");
        p.textContent = "No active alerts for this area.";
        alertsDisplay.appendChild(p);
    }
}

function displayError(message) {
    const errorElement = document.getElementById("error-message");
    errorElement.textContent = `Error: ${message}`;
    errorElement.classList.remove("hidden");
}

function setupEventListeners() {
    document.getElementById("fetch-alerts").addEventListener("click", fetchWeatherAlerts);
}

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', setupEventListeners);
}