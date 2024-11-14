const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById('city-input').value;
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      displayWeather(response);
    } else if (xhr.readyState === 4) {
      alert('City not found. Please try another city.');
    }
  };
  xhr.send();
}

function displayWeather(data) {
  const weatherResult = document.getElementById('weather-result');
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherResult.innerHTML = `
    <h3>${data.name}</h3>
    <img src="${icon}" alt="Weather icon">
    <p>Temperature: ${temp} °C</p>
    <p>Condition: ${description}</p>
  `;
}
