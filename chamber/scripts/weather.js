// OpenWeatherMap API Configuration

// Select HTML elements
const currentWeather = document.querySelector("#current-weather");
const weatherForecast = document.querySelector("#weather-forecast");

// OpenWeatherMap configuration
const apiKey = "YOUR_API_KEY";

const latitude = 14.63;
const longitude = -90.51;

// Current weather URL
const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=${latitude}&lon=${longitude}` +
    `&units=metric&appid=${apiKey}`;

// Forecast URL
const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast` +
    `?lat=${latitude}&lon=${longitude}` +
    `&units=metric&appid=${apiKey}`;


// Fetch current weather
async function apiFetch() {

    try {

        const response = await fetch(url);

        if (response.ok) {

            const data = await response.json();

            console.log("Current Weather:", data);

            displayResults(data);

        } else {

            throw new Error(await response.text());

        }

    } catch (error) {

        console.error("Weather API Error:", error);

        currentWeather.textContent =
            "Weather information is currently unavailable.";

    }

}


// Display current weather
function displayResults(data) {

    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const iconSrc =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

    currentWeather.innerHTML = `
        <div class="weather-now">

            <img
                src="${iconSrc}"
                alt="${description}"
                width="72"
                height="72">

            <div>

                <p class="weather-temp">
                    ${temperature}&deg;C
                </p>

                <p class="weather-description">
                    ${description}
                </p>

            </div>

        </div>
    `;

}


// Fetch forecast
async function forecastFetch() {

    try {

        const response = await fetch(forecastUrl);

        if (response.ok) {

            const data = await response.json();

            console.log("Forecast:", data);

            displayForecast(data);

        } else {

            throw new Error(await response.text());

        }

    } catch (error) {

        console.error("Forecast API Error:", error);

        weatherForecast.textContent =
            "Forecast information is currently unavailable.";

    }

}


// Display three-day forecast
function displayForecast(data) {

    const dailyForecast = [];

    // Guatemala City uses UTC-6 year-round.
    const cityOffset = -6 * 60 * 60 * 1000;

    const localDate = (timestamp) =>
        new Date(timestamp * 1000 + cityOffset)
            .toISOString()
            .slice(0, 10);

    const today = localDate(Date.now() / 1000);

    const forecastByDay = new Map();

    data.list.forEach(item => {

        const date = localDate(item.dt);

        // Skip current day
        if (date <= today) {
            return;
        }

        // Store highest predicted temperature
        const temperature = item.main.temp_max;

        if (!forecastByDay.has(date)) {

            forecastByDay.set(date, temperature);

        } else {

            const previous = forecastByDay.get(date);

            forecastByDay.set(
                date,
                Math.max(previous, temperature)
            );

        }

    });

    // Select next three days
    forecastByDay.forEach((temperature, date) => {

        if (dailyForecast.length < 3) {

            dailyForecast.push({
                date,
                temperature
            });

        }

    });

    weatherForecast.innerHTML = "";

    const list = document.createElement("ul");

    list.classList.add("forecast-list");

    dailyForecast.forEach(day => {

        const item = document.createElement("li");

        const date = new Date(`${day.date}T12:00:00Z`);

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            timeZone: "UTC"
        });

        const temperature = Math.round(day.temperature);

        const label = document.createElement("span");
        label.textContent = dayName;

        const value = document.createElement("strong");
        value.textContent = `${temperature}°C high`;

        item.append(label, value);

        list.appendChild(item);

    });

    weatherForecast.appendChild(list);

}


// Run API requests
apiFetch();
forecastFetch();