const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Mannheim&units=metric&appid=4a7d3d550099322cfb9f2439612a4336";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const urlIcon = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in Mannheim is " + temp + " degrees Celcius.</h1>");
            res.write("<img src="+urlIcon+">");
            res.send();
        })
    });
})

app.listen(3000, function(req, res) {
    console.log("Server is running on port 3000.");
});