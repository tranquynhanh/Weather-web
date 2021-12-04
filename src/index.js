// import "./src/styles.css";

function formatDateTime(Chosenday) {
  const weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let day = weekday[Chosenday.getDay()];

  return `${day} ${Chosenday.getHours()}:${Chosenday.getMinutes()}`;
}

let curTime = formatDateTime(new Date());
let time = document.querySelector(".time");
time.innerHTML = curTime;

function formatDate(Chosenday) {
  const months = new Array(12);
  months[0] = "1";
  months[1] = "2";
  months[2] = "3";
  months[3] = "4";
  months[4] = "5";
  months[5] = "6";
  months[6] = "7";
  months[7] = "8";
  months[8] = "9";
  months[9] = "10";
  months[10] = "11";
  months[11] = "12";

  let month = months[Chosenday.getMonth()];

  return `${month}/${Chosenday.getDate()}/${Chosenday.getFullYear()}`;
}

let curDate = document.querySelector(".date");
curDate.innerHTML = formatDate(new Date());

let city_input = document.querySelector(".city-input");
let city_header = document.querySelector(".header h2");
let input = document.querySelector("#searchCity");
let apiKey = "7ae73a0fdb9a246291b5e3911d1cd392";
let celsiusTemperature = null;

function search(searchCity) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;
    axios.get(url).then(temperature);
}
search("Ho Chi Minh City")

function currentLocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let url = `https://api.openweathermap.org/data/2.5/find?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(temperature);
}
// currentLocation()

city_input.addEventListener("submit", function (e) {
  e.preventDefault();
  search(document.getElementById("searchCity").value);  
});

let city = document.querySelector(".header h2");
let btn_search = document.querySelector(".btn-search");
let forecastElement = document.querySelector(".card.footer");
let today = document.querySelector(".temp");
displayForecast();

function formatDateForecast(timestamp) {
  let date = new Date(timestamp *1000);
  let day = date.getDay();
  let days = ["Sun","Mon","Tue","Wed","Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastHTML = `<div class="card-body card-body-footer">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6 && index > 0) {
    forecastHTML= forecastHTML + `    
      <div class="container-footer">
        <strong class="day">${formatDateForecast(forecastDay.dt)}</strong> <br />
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt="" width="42" height="42">
        <div class="weather-forecast-temperature">
          <span class="temperature temperature-max">${Math.round(forecastDay.temp.max)}°</span>
          <span class="temperature temperature-min">${Math.round(forecastDay.temp.min)}°</span>
        </div>
      </div>
    `
    }
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  forecast.forEach(function(forecastDay, index) {
    if (index == 0) {
      let todayHTML = `
        <span>
          <i class="fas fa-arrow-down icon-arrow"></i>
          ${Math.round(forecastDay.temp.min)}°C
        </span>
        <span>
          <i class="fas fa-arrow-up icon-arrow"></i>
          ${Math.round(forecastDay.temp.max)}°C
        </span>
      `;
      today.innerHTML = todayHTML;
    }
  })
}

function getForecast(coordinates) {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

function temperature(response) {
    let curTemp = document.querySelector(".current-temperature");
    let wind = document.querySelector(".wind");
    let description = document.querySelector("#description");
    let humid = document.querySelector(".humid");
    let icon = document.querySelector("#icon-des");

    celsiusTemperature = response.data.main.temp;

    curTemp.innerHTML = Math.round(celsiusTemperature);
    wind.innerHTML = `Wind ${Math.round(response.data.wind.speed)}km/h`;
    humid.innerHTML = `<i class="fas fa-tint"></i> ${response.data.main.humidity}%`;
    description.innerHTML = response.data.weather[0].description;
    city_header.innerHTML = response.data.name;
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    getForecast(response.data.coord);
}

let curDeg = document.querySelector(".current-temperature");
const btn_group = document.getElementById("btn-group");
const buttons = btn_group.getElementsByTagName("button");

// let fahrenheitLink = document.querySelector(".far");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// let celsiusLink = document.querySelector(".deg");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);

// function displayFahrenheitTemperature(event) {
//   event.preventDefault();
//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let fahrenheitTemperature = (Number(celsiusTemperature) * 9) / 5 + 32;
//   let temperatureElement = document.querySelector(".current-temperature");
//   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
// }

// function displayCelsiusTemperature(event) {
//   event.preventDefault();
//   fahrenheitLink.classList.remove("active");
//   celsiusLink.classList.add("active");
//   let temperatureElement = document.querySelector(".current-temperature");
//   temperatureElement.innerHTML = Math.round(celsiusTemperature);
// }





