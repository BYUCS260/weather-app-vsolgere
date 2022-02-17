document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=55963e83802e72fe90c7fb2f95ceda3a";
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    let results = "";
    results += '<h2>Current weather in ' + json.name + "</h2>";
    for (let i=0; i < json.weather.length; i++) {
      results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png" class="center"/>';
    }
    results += '<h2>' + json.main.temp + " &deg;F</h2>"
    results += "<p>"
    for (let i=0; i < json.weather.length; i++) {
      results += json.weather[i].description
      if (i !== json.weather.length - 1)
      results += ", "

      results += "<p>Feels like " + json.main.feels_like + " &deg;F" + "</p>"
      results += "<p>Temp Min/Max: " + json.main.temp_min + " / " + json.main.temp_max + "</p>";
      results += "<p>Humidity: " + json.main.humidity + "% ,  " + " Pressure: " + json.main.pressure + "</p>"
      results += "<p>Wind Speed: " + json.wind.speed + " mph" + "</p>"
    }
    results += "</p>";
    document.getElementById("weatherResults").innerHTML = results;
  });

  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=55963e83802e72fe90c7fb2f95ceda3a";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let forecast = "";
          forecast += '<h2>5-Day 3-Hour Forecast</h2>';
      for (let i=0; i < json.list.length; i++) {
        forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
        forecast += "<p>Temperature: " + json.list[i].main.temp + "---Feels like " + json.list[i].main.feels_like + "</p>";
        forecast += "<p>Temp Min/Max: " + json.list[i].main.temp_min + " / " + json.list[i].main.temp_max + "</p>";
        forecast += "<p>" + json.list[i].weather[0].description + "</p>"
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png" class="center"/>'
        forecast += "<p>Wind Speed: " + json.list[i].wind.speed + " mph" + "</p>"
        forecast += "<p>Humidity: " + json.list[i].main.humidity + "% ,  " + " Pressure: " + json.list[i].main.pressure + "</p>"
      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });

});
