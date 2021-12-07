let weather = {
  apiKey: "af0f6d34cf486472b9569b38111f1472",

  fetchWeather: function (city, unit, flag = 1) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=" +
        unit +
        "&appid=" +
        this.apiKey
    )
      .then((response) => {
        if ((!response.ok) && (flag == 1)) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data, unit));
  },

  displayWeather: function (data, unit) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;

    if(unit == "metric"){
      document.querySelector(".temp").innerText = temp + "°C";
    }

    else{
      document.querySelector(".temp").innerText = temp + "°F";
    }

    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },

  search: function () {
    var unit;
    if(document.querySelector('.checkbox').checked){
      unit = "metric";
    }
    else{
      unit = "imperial";
    }
    this.fetchWeather(document.querySelector(".search-bar").value, unit);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

document.querySelector(".checkbox").addEventListener('change', (event) => {

  if(document.querySelector('.checkbox').checked){
    if(document.querySelector(".search-bar").value.length == 0){
      weather.fetchWeather(cityName, "metric", 0);
    }
    else{
      weather.fetchWeather(document.querySelector(".search-bar").value, "metric");
    }
  }

  else{
    if(document.querySelector(".search-bar").value.length == 0){
      weather.fetchWeather(cityName, "imperial", 0);
    }
    else{
      weather.fetchWeather(document.querySelector(".search-bar").value, "imperial");
    }
  }
});

let url = "http://www.geoplugin.net/json.gp"
var cityName;

fetch(url).then((response) => {
  if ((!response.ok)) {
    weather.fetchWeather(Delhi, "metric");
  }
  return response.json();})
  .then((data) => {
    cityName = data.geoplugin_city
    weather.fetchWeather(cityName, "metric")
  } 
);


