const request = require('request');

const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=eb07436b4403315786fce446b1b531b5&query=${address}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        weather: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
