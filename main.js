const key = 'YOUR_KEY_HERE';

// Temperature elements
const htmlTempDegrees = document.querySelector('#temp_degrees');

// Weather elements
const htmlWeatherTitle = document.querySelector('.weatherTitle');
const htmlLocationName = document.querySelector('.locationName');
const htmlTime = document.querySelector('.time');

// Location elements
const htmlLocationField = document.querySelector('#location_field');
const htmlLocationBtn = document.querySelector('#location_btn');

htmlLocationBtn.onclick = () => updateWeather(htmlLocationField.value);

//updateWeather('Virginia');

function createWeather(main, temp, name)
{
    return {
        main: main,
        temp: temp,
        name: name,
    };
}

async function updateWeather(location)
{
    const weather = await fetchWeather(location);

    htmlTempDegrees.textContent = `${kelvinToFahrenheit(weather.temp).toFixed(0)}\u00B0`;
    htmlWeatherTitle.textContent = weather.name;
    htmlLocationName.textContent = weather.main;
    htmlTime.textContent = new Date().toLocaleString();
}


async function fetchWeather(location)
{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;
    const response = await fetch(url);
    const data = await response.json();
    return processWeatherJson(data);
}

async function processWeatherJson(data)
{
    console.log(data);

    const weatherData = data.weather[0];
    const temperatureData = data.main;

    // Weather data assignments
    const main = weatherData.main;

    // Temperature data assignments
    const temp = temperatureData.temp;

    const name = data.name;

    return createWeather(main, temp, name);
}

function kelvinToFahrenheit(K)
{
    return ((K - 273.15) * 1.8) + 32;
}

