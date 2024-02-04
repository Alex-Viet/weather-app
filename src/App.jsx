import { useState } from 'react';
import { getWeatherData, get5DaysWeatherForecastData } from './api/weatherData';
import './styles/App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { TextField, Button, Typography, Link, Container } from '@mui/material';
import { ForecastPopup } from './components/forecast/Forecast';

function App() {
  const [city, setCity] = useState('');
  const [cityForForecast, setCityForForecast] = useState('');
  const [actualWeatherData, setActualWeatherData] = useState(null);
  const [weatherForecastData, setWeatherForecastData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

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
    setIsLoading(true);

    get5DaysWeatherForecastData(cityForForecast).then((res) => {
      setWeatherForecastData(res.data);
    });

    setIsLoading(false);
    handleOpenPopup();
  };

  console.log(actualWeatherData)

  return (
    <main>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Weather App
      </Typography>
      {isOpen && (
        <ForecastPopup
          weatherData={weatherForecastData}
          closePopup={handleClosePopup}
          isOpen={isOpen}
          isLoading={isLoading}
        />
      )}
      <Container sx={{display: 'flex', justifyContent: 'center' ,flexWrap: 'wrap', gap: '10px'}}>
        <TextField
          label="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          variant="outlined"
          // error={error}
          // helperText={error}
        />
        <Button
          onClick={handleSearchButtonClick}
          variant="contained"
        >
          Get Weather
        </Button>
      </Container>

      {error && <Typography color="error" sx={{marginTop: '10px'}}>{error}</Typography>}

      {actualWeatherData && (
        <>
          <Container sx={{marginTop: '20px'}}>
            <Typography variant="h5">{actualWeatherData.name}</Typography>
            <Typography>{actualWeatherData.weather[0].description}</Typography>
            <Typography>Temperature: {actualWeatherData.main.temp}</Typography>
            <Typography>Wind Speed: {actualWeatherData.wind.speed}</Typography>
            <Typography>Humidity: {actualWeatherData.main.humidity}</Typography>
          </Container>
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
    </main>
  );
}

export default App;
