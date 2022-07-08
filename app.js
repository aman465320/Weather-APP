const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  const cityName = req.body.cityName;
  const unit = "metric";
  const apiKey = "8fab31bc1388ba220d41dfd1e65ff3d7";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, (resp) => {
    resp.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const nameOfCity = weatherData.name;
      const description = weatherData.weather[0].main;
      const country = weatherData.sys.country;
      const icon = weatherData.weather[0].icon;
      const temperature = weatherData.main.temp;
      const feelsLike = weatherData.main.feels_like;
      const highTemp = weatherData.main.temp_max;
      const lowTemp = weatherData.main.temp_min;
      const sunrise = new Date(weatherData.sys.sunrise * 1000);
      const formattedSunrise =
        sunrise.getHours() +
        ":" +
        sunrise.getMinutes() +
        ":" +
        sunrise.getSeconds();
      const sunset = new Date(weatherData.sys.sunset * 1000);

      const formattedSunset =
        sunset.getHours() +
        ":" +
        sunset.getMinutes() +
        ":" +
        sunset.getSeconds();

      const pressure = weatherData.main.pressure;
      const humidity = weatherData.main.humidity;
      const visibility = weatherData.visibility;
      const windSpeed = weatherData.wind.speed;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.render("weather", {
        cityName: nameOfCity,
        description: description,
        country: country,
        imageURL: imageURL,
        temperature: temperature,
        feelsLike: feelsLike,
        highTemp: highTemp,
        lowTemp: lowTemp,
        sunrise: formattedSunrise,
        sunset: formattedSunset,
        pressure: pressure,
        humidity: humidity,
        visibility: visibility,
        windSpeed: windSpeed,
      });
    });
  });
});

app.get("/weather", (req, res) => {
  res.write("Enter through home page via searching a city");
  res.send();
});

app.listen(4500, () => {
  console.log("server started at port 4500");
});
