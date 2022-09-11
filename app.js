// const { response } = require('express');
const { json } = require('express');
const express = require('express');
const app = express();
const https = require('https');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }))

app.post("/", (req, res) => {
    const apikey = "030daa2398d0fea0d001f7f951dda1f4";
    const query = req.body.cityName;
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=030daa2398d0fea0d001f7f951dda1f4";

    https.get(url, function (response) {

        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feelsLike = weatherData.main.feels_like;
            const tempMin = weatherData.main.temp_min;
            const Desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const wiurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<style>body{text-align:center;}</style>")
            res.write("<h1>The temprature in " + query + " is " + temp + " Degree celcuis</h1>");
            res.write("<h1>The temprature in " + query + " feels like " + feelsLike + " Degree celcuis</h1>");
            res.write("<h1>The temprature in " + query + " is minimum " + tempMin + " Degree celcuis</h1>");
            // res.write("<hr>")
            res.write("<h2>The Conditions of the weather of surroundings is " + Desc + "</h2>");
            res.write("<img src =" + wiurl + " alt = 'test'>");
            res.send();
        });

    });

});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
    console.log("Listening on server port no 3000");
});


