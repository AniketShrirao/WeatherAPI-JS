/* Author: Aniket*/
var changingBackground = document.querySelector('main .wrapper');
var submit = document.querySelector('.submit');
var display = document.querySelector('.display');
var dataRecieved;
var onlyLocation;
var currentLocation;
var cityName;
var name;
submit.addEventListener('click',function(e) {
  var city = document.querySelector('.input_text').value;
  var Url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=a1a305c08d22da9f0357ca84f0bd5cec&units=metric";
  e.preventDefault();
  fetch(Url)
  .then(function (response) {
    return response.json();
    })
    .then(function (data) {
      dataRecieved = data;
      validate(city);
      displayData();
    })
    .catch(function (err) {
    console.log("Something went wrong!", err);
  });
});

// validation if empty string or not a correct city name
function validate(city) {
  debugger;
  if(dataRecieved.cod === "404") {
    alert('Enter correct city name');    
  } 
  cityName = dataRecieved.name;
  name = cityName.toLowerCase();
  if (name.indexOf(city) === -1 || city === " ") {
    alert('Enter correct city name');
    clear();
  } else {
    return true;
  }
}

function displayData() {
debugger
// validate before display 
  if(display.innerHTML === "" ||   currentLocation !== name) {
    clear();
// Storing Retrieved data into variables
var iconUnicode = dataRecieved.weather[0].icon;
var weatherstatus = dataRecieved.weather[0]['description'];
var tempValue = dataRecieved['main']['temp'];
var windSpeedval = dataRecieved['wind']['speed'];
var iconUrl = "http://openweathermap.org/img/wn/"+iconUnicode+"@2x.png";

// Creating Element-Childs of .display class element
  var weatherhead = document.createElement('h1');
  var descriptionTitle = document.createElement('p');
  var temperatureValue = document.createElement('p');
  var windSpeed = document.createElement('p');
  var weatherStatusNow =document.createElement('a');
  var weatherIcon =document.createElement('a');
  var weatherIconImg =document.createElement('img');
// setting class to all created elements
  weatherStatusNow.setAttribute('class','current-weather');
  weatherIconImg.setAttribute('src',iconUrl);
  descriptionTitle.setAttribute('class','desc');
  temperatureValue.setAttribute('class','temp');
  windSpeed.setAttribute('class','cloud');

// appending Element-Childs to .display class element
  weatherhead.appendChild(weatherStatusNow);
  weatherhead.appendChild(weatherIcon);
  weatherIcon.appendChild(weatherIconImg);
  display.appendChild(weatherhead);
  display.appendChild(descriptionTitle);
  display.appendChild(temperatureValue);
  display.appendChild(windSpeed);

// selecting all element-Childs through classes
  var desc =  document.querySelector('.desc');
  var temperatureValue =  document.querySelector('.temp');
  var windSpeedValue =  document.querySelector('.cloud');
  var currentWeather = document.querySelector('.current-weather');

// displaying retrieved data to innerText of elements 
  desc.innerText = "city location: "+cityName;
  temperatureValue.innerText = "temperature Value: "+tempValue+"\xB0 C";
  windSpeedValue.innerText = "Wind speed: "+windSpeedval+"km/hr";
  currentWeather.innerText = weatherstatus;

// checking if it is a previous entered location or not
  var previousLocation = desc.innerText;
  var n = 2; 
  var a = previousLocation.split(' ');
  onlyLocation =  a.slice(n).join(' ');
  currentLocation = onlyLocation.toLowerCase();
// calling changeBgColor to change the background image of [main .wrapper] element
  changeBgColor(weatherstatus);
  } else {
    return false;
  }
}
function changeBgColor(weatherstatus) {
  var icon = dataRecieved.weather[0].icon,
  weatherType;
// checking whether the weatherType is matching the user inputted location weatherType
  if(icon === "11d"){
    weatherType=  "thunderstorm";
  }else if(icon === "09d" || icon === "09n"){
    weatherType= "drizzle";
  }else if(icon === "10d" || icon === "10n"){
    weatherType= "rain";
  } else if(icon === "13d" || icon === "13n"){
    weatherType= "snow";
  }else if(icon === "01d" || icon === "01n"){
    weatherType= "clear sky";
  }else if(icon === "02d" || icon === "02n" || icon === "03d" || icon === "03n" || icon === "04d" || icon === "04n"){
    weatherType= "cloudy";
  }else if(icon === "50d" || icon === "50n"){
    weatherType= "smoke";
  }else {
    weatherType = "default";
  };
// Changing the background image of [main .wrapper] element
  var urlbgcolor = weatherType+".jpg";
  var backgroundUrl = 'url("assets/images/'+urlbgcolor+'") no-repeat';
  // changingBackground.setAttribute('background',backgroundUrl);
  // changingBackground.setAttribute('backgroundSize','cover');
  // changingBackground.setAttribute('backgroundPosition','center');
  changingBackground.style.background = backgroundUrl;
  changingBackground.style.backgroundSize = 'cover';
}

// clear the display field 
function clear() { display.innerHTML = "";}