const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('../../weather-app/utils/forecast');
const geocode = require('../../weather-app/utils/geocode');
console.log();
const app = express();
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//setup handlebasrs engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Adnan Samol',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Adnan Samol',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    textMessage: 'Some helpful text',
    name: 'Adnan Samol',
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send('Please provide a valid address!');
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return console.log(error);
      }

      forecast(location, (error, forecastData) => {
        if (error) {
          return console.log(error);
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Article not found',
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
  });
});
app.listen(3000, () => {
  console.log('Server is up!');
});
