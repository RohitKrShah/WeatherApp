const weatherApi = {
  key: "5f9bf70691d3904310b55ec461bab727",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};
const searchInputBox = document.getElementById("inputBox");

searchInputBox.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector(".detailsBody").style.display = "block";
  }
});

function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

function showWeatherReport(weather) {
  console.log(weather);

  let city = document.getElementById("city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp = document.getElementById("temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minmaxTemp = document.getElementById("min-max");
  minmaxTemp.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

  let weatherType = document.getElementById("weather");
  weatherType.innerHTML = `${weather.weather[0].main}`;
  let humidity = document.getElementById("humidity");
  humidity.innerHTML = `Humidity:${weather.main.humidity}%`;
  let pressure = document.getElementById("pressure");
  pressure.innerHTML = `Air pressure:${weather.main.pressure} hPa`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  let change = document.querySelector(".detailsBody");
  let app = document.querySelector(".appMain");

  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('images/Clear.jpeg')";
    change.style.backgroundColor = "blue";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('images/Cloudy.jpeg')";
    change.style.backgroundColor = "blueviolet";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url('images/hazeweather.jpeg')";
    change.style.backgroundColor = "black";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('images/Rainy.jpg')";
    change.style.backgroundColor = "darkcyan";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url('images/snowweather.jpeg')";
    change.style.backgroundColor = "cornflowerblue";
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url('images/thunderstorm.jpeg')";
    change.style.backgroundColor = "darkslategray";
  } else if (weatherType.textContent == "Smoke") {
    document.body.style.backgroundImage = "url('images/Smoke.jpeg')";
    change.style.backgroundColor = "dimgrey";
  } else if (weatherType.textContent == "Fog") {
    document.body.style.backgroundImage = "url('images/Fog.jpeg')";
    change.style.backgroundColor = "darkslateblue";
  } else if (weatherType.textContent == "Mist") {
    document.body.style.backgroundImage = "url('images/Mist.jpeg')";
    change.style.backgroundColor = "forestgreen";
  } else {
    document.body.style.backgroundImage = "url('images/sunny.jpeg')";
    change.style.backgroundColor = "black";
  }
}

function dateManage(dateArg) {
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

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}
