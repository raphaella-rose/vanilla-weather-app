function formatDate(timestamp) {
let date = new Date(timestamp)
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
return days[day];
}

function getForecast(coordinates) {
let apiKey = "e99a6b83a02b9bd00c5d8a973f6c63e0";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windspeedElement = document.querySelector("#windspeed");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");
let maxMinElement = document.querySelector("#max-min-temp");
let maxTemperature = Math.round(response.data.main.temp_max);
let minTemperature = Math.round(response.data.main.temp_min);
celciusTemperature = response.data.main.temp;
temperatureElement.innerHTML = Math.round(celciusTemperature);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = `humidity: ${response.data.main.humidity}%`;
windspeedElement.innerHTML = `windspeed: ${Math.round(response.data.wind.speed)} Km/H`;
maxMinElement.innerHTML = `High: ${maxTemperature}° Low: ${minTemperature}°`
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);
}

function displayForecast(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");
let forecastHTML = "";
forecast.forEach(function(forecastDay, index) {
if (index > 0 && index <6) {
forecastHTML  = forecastHTML + 
 ` <li class="tomorrow">
    <span class="icon"><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
    alt=""
    width=40px />
    </span> <span class="day">${formatDay(forecastDay.dt)}</span> <strong class="forecast-temp">${Math.round(forecastDay.temp.max)}°</strong> <span class="forecast-temp">${Math.round(forecastDay.temp.min)}°</span>
    </li>`;    
}
})
forecastElement.innerHTML = forecastHTML;
}

function search(city) {
let apiKey = "e99a6b83a02b9bd00c5d8a973f6c63e0";
let unit = "metric"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
axios.get(apiUrl).then(displayTemperature)
} 

function handleSubmit(event) {
event.preventDefault();
let cityInputElement = document.querySelector("#location-input");
search(cityInputElement.value);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

search("London")
