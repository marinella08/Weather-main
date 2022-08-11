//Search city in world

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=eadaf9d564268a9d29e613879a48803e`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search");
  let city = document.querySelector("#city");
  city.innerHTML = `${cityInputElement.value[0].toUpperCase()}${cityInputElement.value.substring(
    1
  )}`;
  //let city = `${cityInputElement.value}`;
  search(cityInputElement.value);
  console.log(cityInputElement);
}
search("Kiev");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//MY CURRENT GEOLOCATION
function showCity(event) {
  event.preventDefault();
}
function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=eadaf9d564268a9d29e613879a48803e`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);

function showTemperature(response) {
  let citySearch = response.data.name;
  let searchInput = document.querySelector("#search");
  searchInput.innerHTML = `${citySearch}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${citySearch}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=eadaf9d564268a9d29e613879a48803e`;
  axios.get(apiUrl).then(showWeather);
}

//Current time
function formatDate(date) {
  let currentDate = document.querySelector("#date");
  let currentTime = document.querySelector("#time");

  let now = new Date();
  let number = date.getDate();
  if (number < 10) {
    number = `0${number}`;
  }

  let day = now.getDay();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  let year = date.getFullYear();
  let month = now.getMonth();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendnesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let Day = days[date.getDay()];

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let Month = months[date.getMonth()];

  currentDate.innerHTML = `${number}/${Month}/${year}`;
  currentTime.innerHTML = `${Day} ${hour}:${min}`;
}

console.log(formatDate(new Date()));

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// displayForecast();

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=eadaf9d564268a9d29e613879a48803e`;
  axios.get(apiUrl).then(displayForecast);
}

//SEARCH TEMPERATURE
function showWeather(response) {
  console.log(response.data);

  let temperature = Math.round(response.data.main.temp);
  let tempElment = document.querySelector("#temperature");
  tempElment.innerHTML = `${temperature}°C`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsElment = document.querySelector("#feelsLike");
  feelsElment.innerHTML = `${feelsLike} °C`;

  let humidity = response.data.main.humidity;
  let humidityElment = document.querySelector("#humidity");
  humidityElment.innerHTML = `${humidity} %`;

  let pressure = response.data.main.pressure;
  let pressureElment = document.querySelector("#pressure");
  pressureElment.innerHTML = `${pressure} hPa`;

  let wind = Math.round(response.data.wind.speed);
  let windElment = document.querySelector("#wind");
  windElment.innerHTML = `${wind} m/s`;

  let description = response.data.weather[0].description;
  let descriptionElment = document.querySelector("#description");
  descriptionElment.innerHTML = `${description}`;

  let sunrise = response.data.sys.sunrise;
  let sunriseCal = new Date((sunrise + response.data.timezone) * 1000);
  let h = "0" + sunriseCal.getHours();
  let m = "0" + sunriseCal.getMinutes();
  let t = h + ":" + m.substr(-2);
  let sunriseElment = document.querySelector("#sunrise");
  sunriseElment.innerHTML = `${t}`;

  let sunset = response.data.sys.sunset;
  let sunsetCal = new Date((sunset + response.data.timezone) * 1000);
  let hour = sunsetCal.getHours();
  let min = "0" + sunsetCal.getMinutes();
  let time = hour + ":" + min.substr(-2);

  let sunsetElment = document.querySelector("#sunset");
  sunsetElment.innerHTML = `${time}`;

  //ICON
  // let description = response.data.weather[0].description;
  let iconElment = document.querySelector("#icon");
  if (description === "clear sky") {
    iconElment.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/168/original/01d.png?1656677804`
    );
  } else if (description === "few clouds") {
    iconElment.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/169/original/02d.png?1656677813`
    );
  } else if (description === "scattered clouds") {
    iconElment.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/170/original/03d.png?1656677822`
    );
  } else if (
    description === "broken clouds" ||
    description === "overcast clouds"
  ) {
    iconElment.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/171/original/04d.png?1656677838`
    );
  } else if (
    description === "shower rain" ||
    description === "light intensity drizzle" ||
    description === "drizzle" ||
    description === "heavy intensity drizzle" ||
    description === "light intensity drizzle rain" ||
    description === "drizzle rain" ||
    description === "heavy intensity drizzle rain" ||
    description === "shower rain and drizzle" ||
    description === "heavy shower rain and drizzle" ||
    description === "shower drizzle" ||
    description === "heavy intensity shower rain" ||
    "ragged shower rain"
  ) {
    iconElment.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/172/original/09d.png?1656677847`
    );
  } else if (
    description === "rain" ||
    description === "light rain    " ||
    description === "moderate rain" ||
    description === "heavy intensity rain" ||
    description === "very heavy rain" ||
    description === "extreme rain"
  ) {
    iconElment.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/173/original/10d.png?1656677854`
    );
  } else if (
    description === "thunderstorm" ||
    description === "thunderstorm with light rain" ||
    description === "thunderstorm with rain" ||
    description === "thunderstorm with heavy rain" ||
    description === "light thunderstorm" ||
    description === "heavy thunderstorm" ||
    description === "ragged thunderstorm    " ||
    description === "thunderstorm with light drizzle" ||
    description === "thunderstorm with drizzle" ||
    description === "thunderstorm with heavy drizzle"
  ) {
    iconElment.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/174/original/11d.png?1656677860`
    );
  } else if (
    description === "snow" ||
    description === "light snow" ||
    description === "Snow" ||
    description === "Heavy snow" ||
    description === "Sleet" ||
    description === "Light shower sleet" ||
    description === "Shower sleet" ||
    description === "freezing rain" ||
    description === "Light rain and snow" ||
    description === "Rain and snow" ||
    description === "Light shower sleet" ||
    description === "Shower snow" ||
    description === "Heavy shower snow"
  ) {
    iconElment.setAttribute(
      "src",
      ` https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/175/original/13d.png?1656677869`
    );
  } else if (
    description === "mist" ||
    description === "tornado" ||
    description === "squalls" ||
    description === "volcanic ash" ||
    description === "dust" ||
    description === "sand" ||
    description === "fog" ||
    description === "sand/ dust whirls" ||
    description === "Haze" ||
    description === "Smoke"
  ) {
    iconElment.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/316/original/50d.png?1656854718`
    );
  } else {
    iconElment.innerHTML = null;
  }

  getForecast(response.data.coord);
}