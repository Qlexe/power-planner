import { fetchWeatherApi } from 'openmeteo';

const params = {
    "latitude": 50.4592,
    "longitude": 33.8239,
    "daily": ["temperature_2m_max", "temperature_2m_min", "rain_sum", "showers_sum", "snowfall_sum", "precipitation_hours"],
    "timezone": "auto",
    "past_days": 7,
    "forecast_days": 16
};
const url = "https://api.open-meteo.com/v1/forecast";
fetchWeatherApi(url, params)
    .then((responses) => {
        // Helper function to form time ranges
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();

        const daily = response.daily();

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            daily: {
                time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                temperature2mMax: daily.variables(0).valuesArray(),
                temperature2mMin: daily.variables(1).valuesArray(),
                rainSum: daily.variables(2).valuesArray(),
                showersSum: daily.variables(3).valuesArray(),
                snowfallSum: daily.variables(4).valuesArray(),
                precipitationHours: daily.variables(5).valuesArray(),
            },
        };

        // `weatherData` now contains a simple structure with arrays for datetime and weather data
        for (let i = 0; i < weatherData.daily.time.length; i++) {
            console.log(
                weatherData.daily.time[i].toISOString(),
                weatherData.daily.temperature2mMax[i],
                weatherData.daily.temperature2mMin[i],
                weatherData.daily.rainSum[i],
                weatherData.daily.showersSum[i],
                weatherData.daily.snowfallSum[i],
                weatherData.daily.precipitationHours[i]
            );
        }
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error);
    });
