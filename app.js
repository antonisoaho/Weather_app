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

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.weatherapi.com/v1/current.json?key=${apiKey}%20&q=${lat},${long}&aqi=no`;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const { temp_c, temp_f, is_day } = data.current;
          const { name } = data.location;
          const { text } = data.current.condition;

          //Set DOM elements from API-values
          temperatureDegree.textContent =
            temperatureType.textContent === 'C' ? temp_c : temp_f;
          locationTimezone.textContent = name;
          temperatureDescription.textContent = text;

          let isDay;
          if ((data.current.condition.is_day = 1)) {
            isDay = '_DAY';
          } else {
            isDay = '_NIGHT';
          }

          setIcons(text, document.querySelector('.icon'), isDay);

          //Change temperature to Celsius/Fahrenheit
          degreeSection.addEventListener('click', () => {
            if (temperatureType.textContent === 'C') {
              temperatureType.textContent = 'F';
              temperatureDegree.textContent = temp_f;
            } else {
              temperatureType.textContent = 'C';
              temperatureDegree.textContent = temp_c;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID, day) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/ /g, '_').toUpperCase() + day;
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
