const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const weather = document.querySelector('.weather-container');
const weatherDetails = document.querySelector('.bottom-detail');
const locationError = document.querySelector('.not-found');
const errorMessage = document.querySelector('.not-found p');

search.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("submitted")
    const APIKey = 'd055e4ea227941ba9e475107231112';
    const location = document.querySelector('.search-box input').value;

    if (location == '')
        return;
        
        updateWeatherUI(location);

        async function fetchWeatherData(location) {
            try {
                const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${location}&key=d055e4ea227941ba9e475107231112`);
                const json = await response.json();
                return json;
            } catch (error) {
                console.error('Error fetching weather data:', error);
                return null;
            }
        }
        
        async function updateWeatherUI(location) {
            const weather_data = await fetchWeatherData(location);
            
            if (weather_data) {
                console.log(weather_data);

                if (weather_data.error) {
                    errorMessage.innerHTML = weather_data.error.message;
                    container.style.height = '400px';
                    weather.classList.remove('active');
                    weatherDetails.classList.remove('active');
                    locationError.classList.add('active');
                } else {
                    container.style.height = '555px';
                    weather.classList.add('active');
                    weatherDetails.classList.add('active');
                    locationError.classList.remove('active');
                    const image = document.querySelector('.weather-container img');
                    const temperature = document.querySelector('.weather-container .temperature .value');
                    const region = document.querySelector('.weather-container .location .region');
                    const country = document.querySelector('.weather-container .location .country');
                    const description = document.querySelector('.weather-container .description');
                    const humidity = document.querySelector('.bottom-detail .humidity .humidity_detail .value');
                    const pressure = document.querySelector('.bottom-detail .pressure .pressure_detail .value');
                    const wind = document.querySelector('.bottom-detail .wind-speed .speed_detail .value');
            
                    description.innerHTML = weather_data.current.condition.text
                    temperature.innerHTML = weather_data.current.temp_c
                    region.innerHTML = weather_data.location.name
                    country.innerHTML = weather_data.location.country
                    humidity.innerHTML = weather_data.current.humidity
                    pressure.innerHTML = weather_data.current.pressure_in
                    wind.innerHTML = weather_data.current.wind_kph
                    image.src = weather_data.current.condition.icon
                }
            }
        }
});