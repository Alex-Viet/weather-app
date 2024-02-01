import { useState } from 'react';
import { getWeatherData } from './api/weatherData';
import './styles/App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { TextField, Button, Typography } from '@mui/material';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleSearchButtonClick = (e) => {
    e.preventDefault();

    if (!city) {
      setError('Please enter a city');
      return;
    }

    getWeatherData(city).then((res) => {
      console.log(res);

      setWeatherData(res.data);
      console.log('🚀 ~ getWeatherData ~ res.data:', res.data);
      setError('');
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
      />
      <Button
        onClick={handleSearchButtonClick}
        variant="contained"
      >
        Get Weather
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {weatherData && (
        <div>
          <Typography variant="h5">{weatherData.name}</Typography>
          <Typography>{weatherData.weather[0].description}</Typography>
          <Typography>Temperature: {weatherData.main.temp}</Typography>
          <Typography>Wind Speed: {weatherData.wind.speed}</Typography>
          <Typography>Humidity: {weatherData.main.humidity}</Typography>
        </div>
      )}
    </div>
  );
}

export default App;
