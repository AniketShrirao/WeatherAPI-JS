/* Author: Aniket*/
var changingBackground = document.querySelector('main .wrapper');
var submit = document.querySelector('.submit');
var display = document.querySelector('.display');
var dataRecieved;
submit.addEventListener('click',function(e) {
  var city = document.querySelector('.input_text').value;
  var Url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=a1a305c08d22da9f0357ca84f0bd5cec&units=metric";

  e.preventDefault();
  fetch(Url)
  .then(function (response) {
    return response.json();
    })
    .then(function (data) {
      console.log(data);
      dataRecieved = data;
      displayData();
    })
    .catch(function (err) {
    console.log("Something went wrong!", err);
  });
});

function displayData() {
// Creating Element-Childs of .display class element
  var weatherhead = document.createElement('h1');
  var descriptionTitle = document.createElement('p');
  var temperatureValue = document.createElement('p');
  var windSpeed = document.createElement('p');
  var weatherIcon =document.createElement('a');

// setting class to all created elements
  weatherIcon.setAttribute('class','current-weather');
  descriptionTitle.setAttribute('class','desc');
  temperatureValue.setAttribute('class','temp');
  windSpeed.setAttribute('class','cloud');

// appending Element-Childs to .display class element
  weatherhead.appendChild(weatherIcon);
  display.appendChild(weatherhead);
  display.appendChild(descriptionTitle);
  display.appendChild(temperatureValue);
  display.appendChild(windSpeed);

// selecting all element-Childs through classes
  var desc =  document.querySelector('.desc');
  var temperatureValue =  document.querySelector('.temp');
  var windSpeedValue =  document.querySelector('.cloud');
  var currentWeather = document.querySelector('.current-weather');

// Storing Retrieved data into variables
  var iconUnicode = dataRecieved.weather[0].icon;
  var weatherstatus = dataRecieved.weather[0]['description'];
  var tempValue = dataRecieved['main']['temp'];
  var windSpeedval = dataRecieved['wind']['speed'];

// displaying retrieved data to innerText of elements 
  desc.innerText = "weather status: "+weatherstatus;
  temperatureValue.innerText = "temperature Value: "+tempValue+"\xB0 C";
  windSpeedValue.innerText = "Wind speed: "+windSpeedval+"km/hr";
  currentWeather.innerText = weatherstatus;
  desc.innerText = "weather status: "+weatherstatus;
  iconUnicode = "\\"+iconUnicode;

// calling changeBgColor to change the background image of [main .wrapper] element
  changeBgColor(weatherstatus);
}
function changeBgColor(weatherstatus) {
  debugger;
  var icon = dataRecieved.weather[0].icon,
  weatherType;
// checking whether the weatherType is matching the user inputted location weatherType
  if(icon === "11d"){
    weatherType=  "thunderstorm";
  }else if(icon === "09d"){
    weatherType= "drizzle";
  }else if(icon === "10d"){
    weatherType= "rain";
  } else if(icon === "13d"){
    weatherType= "snow";
  }else if(icon === "01d" || icon === "01n"){
    weatherType= "clear sky";
  }else if(icon === "02d" || icon === "02n" || icon === "03d" || icon === "03n" || icon === "04d" || icon === "04n"){
    weatherType= "cloudy";
  }else {
    weatherType = "default";
  };
// Changing the background image of [main .wrapper] element
  var urlbgcolor = weatherType+".jpg";
  changingBackground.style.background = 'url("assets/images/'+urlbgcolor+'") no-repeat';
  changingBackground.style.backgroundSize = 'cover';
  changingBackground.style.backgroundPosition = 'center'; 
}