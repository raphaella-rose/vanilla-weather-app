function displayTemperature(response) {
let temperatureElement = document.querySelector("#temperature")
let cityElement = document.querySelector("#city")
let descriptionElement = document.querySelector("#description")
let humidityElement = document.querySelector("#humidity")
let windspeedElement = document.querySelector("#windspeed")
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = `humidity: ${response.data.main.humidity}%`;
windspeedElement.innerHTML = `windspeed: ${Math.round(response.data.wind.speed)} Km/H`;
}


let apiKey = "e99a6b83a02b9bd00c5d8a973f6c63e0";
let unit = "metric"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=${unit}`

axios.get(apiUrl).then(displayTemperature)