//// Celsius and Fahrenheit Conversion ////

// Convert Celsius to Fahrenheit

function toFahrenheit(event) {
  event.preventDefault();
  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");

  let temperatureElement = document.querySelector("#currentTemp");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = `${fahrenheitTemperature} °F`;
}

// Convert Fahrenheit to Celsius

function toCelsius(event) {
  event.preventDefault();
  fahrenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");

  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `${celsiusTemperature} °C`;
}

// Listen to Fahrenheit Button Request

let fahrenheitButton = document.querySelector("#fahrenheitButton");
fahrenheitButton.addEventListener("click", toFahrenheit);

// Listen to Celsius Button Request

let celsiusButton = document.querySelector("#celsiusButton");
celsiusButton.addEventListener("click", toCelsius);

let celsiusTemperature = null;

//// Format Date and Time ////

// Format Days

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Format Months

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

// Get Today's Date and Current Time

let now = new Date();
let year = now.getFullYear();
let month = months[now.getMonth()];
let date = now.getDate();
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

// If hours are less than 10, add 0

if (hours < 10) {
  hours = `0${hours}`;
}

// If minutes are less than 10, add 0

if (minutes < 10) {
  minutes = `0${minutes}`;
}

// If seconds are less than 10, add 0

if (seconds < 10) {
  seconds = `0${seconds}`;
}

// Show Formatted Date and Time

let h3Date = document.querySelector("#date");
h3Date.innerHTML = `${day}, ${month} ${date}, ${year}`;
let h3Time = document.querySelector("#time");
h3Time.innerHTML = `${hours}:${minutes}:${seconds}`;

//// Show Temperature and Location ////

// Show City, Country, Temperature, Description, Windspeed, Humidity, Precipitation and Icon

function showTemperature(response) {
  let city = response.data.name;
  let country = response.data.sys.country;
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  cityElement.innerHTML = city;
  countryElement.innerHTML = country;

  celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `${celsiusTemperature} °C`;

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Windspeed: ${wind} km/h`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity} %`;

  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", description);

  if (response.data.rain === undefined) {
    let precipitationElement = document.querySelector("#precipitation");
    precipitationElement.innerHTML = `Precipitation: 0 mm`;
  } else {
    let precipitation = Math.round(response.data.rain["1h"]);
    let precipitationElement = document.querySelector("#precipitation");
    precipitationElement.innerHTML = `Precipitation: ${precipitation} mm`;
  }
}

// Search City using API and then show Temperature and Location

function changeCity(city) {
  let apiKey = "2475b81063d9be2c73be8865397340ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

// Receive City Input and Use Celsius as Default

function submitCity(event) {
  event.preventDefault();
  fahrenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");

  let city = document.querySelector("#city-input").value;
  changeCity(city);
}

// Listen to New Search Request

let searchBar = document.querySelector("form");
searchBar.addEventListener("submit", submitCity);

//// Current Location and Temperature ////

// Show Current Location and then Show Temperature

function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2475b81063d9be2c73be8865397340ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

// Search Current Position and Use Celsius as Default

function findCurrentPosition(event) {
  event.preventDefault();
  fahrenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");

  navigator.geolocation.getCurrentPosition(searchPosition);
}

// Listen to Current Position Request

let currentPositionButton = document.querySelector("#current");
currentPositionButton.addEventListener("click", findCurrentPosition);

// Default Search on Load

changeCity("Montreal");
