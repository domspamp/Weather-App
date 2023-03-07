const wrapper = document.querySelector('.wrapper');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const error = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const apiKey = 'd2cbe9b3cb5208ed5bbcb19138b6e5a4';

    const cityName = document.querySelector('.search-box input').value;
    console.log(cityName);
    document.querySelector('.search-box input').value = '';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(result => {
        console.log(result);

        if (result.cod === '400') {
            wrapper.style.height = '400px';
            weatherBox.style.display = 'none';
            error.style.display = 'block';
            error.classList.add('fadeIn');
            return;
        }

        //Setup the correct animation
        error.style.display = 'none';
        error.classList.remove('fadeIn');
        weatherBox.style.display = '';
        weatherBox.classList.add('fadeIn');
        wrapper.style.height = '600px';

        document.querySelector('.city').innerHTML = result.name;

        setImage(result.weather[0]);

        document.querySelector('.temperature').innerHTML = Math.round(result.main.temp) + "°F";
        document.querySelector('.description').innerHTML =
            "Feels Like: " + Math.round(result.main.feels_like) + "°F<br>Low: "
            + Math.round(result.main.temp_min) + "°F<br>High: "
            + Math.round(result.main.temp_max) + "°F";
    })

})

function setImage(weather) {
    const main = weather.main;
    const desc = weather.description;
    const img = document.querySelector('.weather-box img');
    switch (main) {
        case 'Clear':
            img.src = 'images/weather_sun_sunny_temperature.png';
            break;
        case 'Clouds':
            switch (desc) {
                case 'few clouds':
                case 'scattered clouds':
                    img.src = 'images/clouds_sun_sunny_weather.png';
                    break;
                default:
                    img.src = 'images/cloudy_weather_clouds_cloud.png';
                    break;
            }
            break;
        case 'Drizzle':
            img.src = 'images/rain_cloud_drizzel_weather.png';
            break;
        case 'Rain':
            switch(desc) {
                case 'light rain':
                case 'moderate rain':
                    img.src = 'images/sunny_rain_cloudy_weather_clouds.png';
                    break;
                case 'heavy intensity rain':
                case 'heavy rain':
                case 'very heavy rain':
                case 'extreme rain':
                case 'freezing rain':
                case 'heavy intensity shower rain':
                    img.src = 'images/cloudy_weather_forecast_rain_clouds.png';
                    break;
                default:
                    img.src = 'images/rain_storm_shower_weather.png';
                    break;
            }
            break;
        case 'Thunderstorm':
            switch(desc) {
                case 'thunderstorm with light rain':
                case 'thunderstorm with rain':
                case 'light thunderstorm':
                case 'thunderstorm':
                case 'thunderstorm with light drizzle':
                case 'thunderstorm with drizzle':
                    img.src = 'images/storm_weather_thunder_clouds_rain.png';
                    break;
                default:
                    img.src = 'images/storm_weather_night_clouds.png';
                    break;
            }
            break;
        case 'Snow':
            img.src = 'images/winter_snow_clouds_weather.png';
            break;
        case 'Smoke':
        case 'Haze':
        case 'Fog':
        case 'Mist':
            img.src = 'images/foggy_weather_fog_clouds_cloudy.png';
            break;
        case 'Dust':
        case 'Sand':
        case 'Ash':
            img.src = 'images/storm_weather_sandstorm_sand_cloud.png';
            break;
        case 'Squall':
            img.src = 'images/storm_weather_night_clouds.png';
            break;
        default:
            img.src = 'images/hurricane_weather_tornado_storm.png';
            break;
    }
}
