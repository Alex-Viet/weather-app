import { useState } from 'react';
import { getWeatherData, get5DaysWeatherForecastData } from './api/weatherData';
import './styles/App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { TextField, Button, Typography, Link } from '@mui/material';

function App() {
  const [city, setCity] = useState('');
  const [cityForForecast, setCityForForecast] = useState('');
  const [actualWeatherData, setActualWeatherData] = useState(null);
  const [weatherForecastData, setWeatherForecastData] = useState({});
  const [error, setError] = useState('');

  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    setActualWeatherData(null);

    if (!city) {
      setError('Please enter a city');
      return;
    }

    getWeatherData(city).then((res) => {
      setActualWeatherData(res.data);
      setError('');
    });

    setCityForForecast(city);
  };

  const handle5DayForecastLinkClick = (e) => {
    e.preventDefault();

    get5DaysWeatherForecastData(cityForForecast).then((res) => {

      setWeatherForecastData(res.data);
    });
  };

  return (
    <div>
      <Typography variant="h4">Weather App</Typography>
      <TextField
        label="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        variant="outlined"
        // error={error}
        // helperText={error}
      />
      <Button sx={{marginLeft: '10px'}} onClick={handleSearchButtonClick} variant="contained">
        Get Weather
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {actualWeatherData && (
        <>
          <div>
            <Typography variant="h5">{actualWeatherData.name}</Typography>
            <Typography>{actualWeatherData.weather[0].description}</Typography>
            <Typography>Temperature: {actualWeatherData.main.temp}</Typography>
            <Typography>Wind Speed: {actualWeatherData.wind.speed}</Typography>
            <Typography>Humidity: {actualWeatherData.main.humidity}</Typography>
          </div>
          <div>
            <Link
              underline="none"
              variant="body2"
              onClick={handle5DayForecastLinkClick}
              sx={{ cursor: 'pointer' }}
            >
              Show 5 day weather forecast
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
