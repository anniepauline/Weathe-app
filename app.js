const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res)
{
  res.sendFile(__dirname+ "/index.html");
});


//catch the form data
app.post('/',function(req,res)
{
  const queryPlace = req.body.cityName ;
  const apiKey = "992b100473e80938042d0ed1721a82a7";
  const units = "metrics";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+queryPlace+"&appid="+apiKey+"&units="+units;
  console.log("post recieved!");

   //making http get request to the server to get the data in json format and parsing to js object, getting th specific items we want and sending it back tot he brower using html we want to write.
     https.get(url,function(response){
     console.log(response.statusCode);

     response.on("data", function(data){
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const weatherDescription = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
       res.write("<p>The current weather is "+weatherDescription + "<p>");
       res.write("<h1>The tempertaure in " +queryPlace+" is "+ temp + " degress celcius.</h1>");
       res.write("<img src ="+ iconUrl+ ">");
       res.send();
       })
     })
})

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
