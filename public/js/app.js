console.log('Client side js loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  msgOne.textContent = '';
  msgTwo.textContent = 'Loading';
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msgOne.textContent = data.error;
          msgTwo.textContent = '';
          console.log(data.error);
        } else {
          msgOne.textContent = data.location;
          msgTwo.textContent =
            data.forecast.weather +
            ', ' +
            data.forecast.temperature +
            '°C, feels like ' +
            data.forecast.feelslike +
            '°C';
          console.log(data);
        }
      });
    }
  );
  console.log(location);
});
