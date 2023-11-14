import { apiKey } from './api.js';

window.addEventListener('load', () => {
  let long;
  let lat;
  const temperatureDegree = document.querySelector('.temperature-degree');
  const temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  const locationTimezone = document.querySelector('.location-timezone');
  const temperatureType = document.querySelector('.degree-section span');
  const temperatureIcon = document.querySelector('.location img');
  const degreeSection = document.querySelector('.degree-section');
  function fetchData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        console.log(long, lat);

        const api = `https://api.weatherapi.com/v1/current.json?key=${apiKey}%20&q=${lat},${long}&lang=sv&aqi=yes`;

        fetch(api)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const { temp_c, temp_f, is_day } = data.current;
            const { name } = data.location;
            const { text, icon } = data.current.condition;

            //Set DOM elements from API-values
            temperatureDegree.textContent =
              temperatureType.textContent === 'C' ? temp_c + '°' : temp_f + '°';
            locationTimezone.textContent = name;
            temperatureDescription.textContent = text;
            temperatureIcon.src = icon;

            //Change temperature to Celsius/Fahrenheit
            degreeSection.addEventListener('click', () => {
              if (temperatureType.textContent === 'C') {
                temperatureType.textContent = 'F';
                temperatureDegree.textContent = temp_f + '°';
              } else {
                temperatureType.textContent = 'C';
                temperatureDegree.textContent = temp_c + '°';
              }
            });
          });
      });
    }
  }
  fetchData();

  setInterval(fetchData, 1000 * 60);
});
