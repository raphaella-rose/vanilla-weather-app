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

function displayTemperature(response) {
let temperatureElement = document.querySelector("#temperature")
let cityElement = document.querySelector("#city")
let descriptionElement = document.querySelector("#description")
let humidityElement = document.querySelector("#humidity")
let windspeedElement = document.querySelector("#windspeed")
let dateElement = document.querySelector("#date")
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = `humidity: ${response.data.main.humidity}%`;
windspeedElement.innerHTML = `windspeed: ${Math.round(response.data.wind.speed)} Km/H`;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
}


let apiKey = "e99a6b83a02b9bd00c5d8a973f6c63e0";
let unit = "metric"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=${unit}`
 
axios.get(apiUrl).then(displayTemperature)