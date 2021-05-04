function showTemperature(response) {
  let city = response.data.name;
  let country = response.data.sys.country;
  let temp = Math.round(response.data.main.temp);
  let locationCity = document.querySelector("#city");
  let locationCountry = document.querySelector("#country");
  let temperature = document.querySelector("#temp");
  locationCity.innerHTML = city;
  locationCountry.innerHTML = country;
  temperature.innerHTML = `${temp}° C`;
}

function changeCity(city) {
  let apiKey = "2475b81063d9be2c73be8865397340ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  changeCity(city);
}

function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2475b81063d9be2c73be8865397340ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function findCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
let searchBar = document.querySelector("form");
searchBar.addEventListener("submit", submitCity);

let currentPositionButton = document.querySelector("button#current");
currentPositionButton.addEventListener("click", findCurrentPosition);
changeCity("Montreal");

//Celsius and Fahrenheit conversion

function toFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelectorAll("#temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
function toCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelectorAll("#temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

////let fahrenheitLink = document.querySelector("fahrenheitButton");
////fahrenheitLink.addEventListener("click", toFahrenheit);

////let celsiusLink = document.querySelector("celsiusButton");
////celsiusLink.addEventListener("click", toCelsius);

//Date and time

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let now = new Date();
let year = now.getFullYear();
let month = months[now.getMonth()];
let date = now.getDate();
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

let h3Date = document.querySelector("#date");
h3Date.innerHTML = `${day}, ${month} ${date}, ${year}`;
let h3Time = document.querySelector("#time");
h3Time.innerHTML = `${hours}:${minutes}:${seconds}`;
