const inputbox = document.querySelector('.input-box');
const searchbtn = document.getElementById('searchbtn');
const weather_img = document.getElementById('weather-image');
const temp = document.querySelector('.Temperature');
const description = document.querySelector('.description');
const humid = document.getElementById('humidity');
const wind = document.getElementById('wind-speed');
const locationNotFound = document.getElementById('location-not-found');
const weatherBody = document.getElementById('weather-body');

async function checkweather(city) {
    const api_key = "a04cbed32b9505375dee8fc30d80b69f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const weather_data = await fetch(url).then(response => response.json());

        if (weather_data.cod === "404") {
            
            locationNotFound.style.display = "block";
            weatherBody.style.display = "none";
        } else {
          
            locationNotFound.style.display = "none";
            weatherBody.style.display = "block";

            temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
            description.innerHTML = `${weather_data.weather[0].description}`;
            humid.innerHTML = `${weather_data.main.humidity}%`;
            wind.innerHTML = `${weather_data.wind.speed} km/h`;

            // Update the weather image based on the main weather condition
            switch (weather_data.weather[0].main.toLowerCase()) {
                case 'clouds':
                    weather_img.src = "/asset/cloud.png";
                    break;
                case 'clear':
                    weather_img.src = "/asset/clear (1).png";
                    break;
                case 'mist':
                    weather_img.src = "/asset/mist (1).png";
                    break;
                case 'rain':
                    weather_img.src = "/asset/rain (1).png";
                    break;
                case 'snow':
                    weather_img.src = "/asset/snow (1).png";
                    break;
                default:
                    weather_img.src = "/asset/default.png";
                    break;
            }

            console.log(weather_data);
        }
    } catch (error) {
        console.error("Error fetching the weather data:", error);
    }
}

// Add event listener to the search button
searchbtn.addEventListener('click', () => {
    const city = inputbox.value.trim();
    if (city) {
        checkweather(city);
    }
});