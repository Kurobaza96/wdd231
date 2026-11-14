// OpenWeatherMap API Configuration

const weatherUrl = "https://chamber-weather-api.emanuel-josue-herrera.workers.dev/";

const WEATHER_LAT = 14.6349;
const WEATHER_LON = -90.5069;

const currentOutput = document.querySelector("#current-weather");
const forecastOutput = document.querySelector("#weather-forecast");

async function loadWeather() {

    if (!currentOutput || !forecastOutput) return;

    if (OPENWEATHER_API_KEY === "") {
        currentOutput.textContent = "Configure the weather API key.";
        forecastOutput.textContent = "Forecast unavailable until API setup.";
        return;
    }

    const baseURL = "https://api.openweathermap.org/data/2.5";

    const query =
        `lat=${WEATHER_LAT}&lon=${WEATHER_LON}` +
        `&units=metric&appid=${OPENWEATHER_API_KEY}`;

    try {

        const [currentResponse, forecastResponse] =
            await Promise.all([
                fetch(`${baseURL}/weather?${query}`),
                fetch(`${baseURL}/forecast?${query}`)
            ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather API request failed");
        }

        const current = await currentResponse.json();
        const forecast = await forecastResponse.json();

        // CURRENT WEATHER

        const temperature = Math.round(current.main.temp);
        const description = current.weather[0].description;
        const icon = current.weather[0].icon;

        currentOutput.innerHTML = `
            <div class="weather-now">

                <img
                    src="https://openweathermap.org/img/wn/${icon}@2x.png"
                    alt="${description}"
                    width="72"
                    height="72">

                <div>
                    <p class="weather-temp">
                        ${temperature}°C
                    </p>

                    <p class="weather-description">
                        ${description}
                    </p>
                </div>

            </div>
        `;

        // THREE-DAY FORECAST

        const dateFormatter = new Intl.DateTimeFormat("en-CA", {
            timeZone: "America/Guatemala",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });

        const today = dateFormatter.format(new Date());

        const dailyForecast = new Map();

        forecast.list.forEach((reading) => {

            const date = dateFormatter.format(
                new Date(reading.dt * 1000)
            );

            if (date <= today) return;

            const high = reading.main.temp_max;

            dailyForecast.set(
                date,
                Math.max(dailyForecast.get(date) ?? -Infinity, high)
            );

        });

        const nextThreeDays =
            [...dailyForecast.entries()].slice(0, 3);

        forecastOutput.innerHTML = "";

        const forecastList = document.createElement("ul");
        forecastList.classList.add("forecast-list");

        nextThreeDays.forEach(([date, temperature]) => {

            const dayName = new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                timeZone: "UTC"
            }).format(new Date(`${date}T12:00:00Z`));

            const item = document.createElement("li");

            const day = document.createElement("span");
            day.textContent = dayName;

            const value = document.createElement("strong");
            value.textContent =
                `${Math.round(temperature)}°C high`;

            item.append(day, value);

            forecastList.appendChild(item);

        });

        forecastOutput.appendChild(forecastList);

    } catch (error) {

        console.error("Weather error:", error);

        currentOutput.textContent =
            "Current weather is temporarily unavailable.";

        forecastOutput.textContent =
            "Forecast is temporarily unavailable.";

    }

}

loadWeather();