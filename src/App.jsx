import { useState } from 'react';
import { getWeatherData, get5DaysWeatherForecastData } from './api/weatherData';
import './styles/App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  useMediaQuery,
  Skeleton,
  Box,
} from '@mui/material';
import { ForecastPopup } from './components/forecast/Forecast';
import { errorsHandler } from './utils/errorsHandler';

function App() {
  const [city, setCity] = useState('');
  const [cityForForecast, setCityForForecast] = useState('');
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [weatherForecastData, setWeatherForecastData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isForecastLoading, setIsForecastLoading] = useState(false);
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
    setCurrentWeatherData(null);

    if (!city) {
      setError('Please enter a city');
      return;
    }

    setIsLoading(true);
    getWeatherData(city).then((res) => {
      const errorText = errorsHandler(res);
      if (errorText) {
        setError(errorText);
        setIsLoading(false);
        return;
      }

      setCurrentWeatherData(res.data);
      setError('');
      setIsLoading(false);
    });

    setCityForForecast(city);
  };

  const handle5DayForecastLinkClick = (e) => {
    e.preventDefault();
    setWeatherForecastData({});
    setIsForecastLoading(true);

    get5DaysWeatherForecastData(cityForForecast).then((res) => {
      const errorText = errorsHandler(res);
      if (errorText) {
        setError(errorText);
        return;
      }

      setWeatherForecastData(res.data);
      setError('');
      setIsForecastLoading(false);
    });

    handleOpenPopup();
  };

  const isMobile = useMediaQuery('(max-width:425px)');

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
          isLoading={isForecastLoading}
        />
      )}
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <TextField
          label="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          variant="outlined"
        />
        <Button onClick={handleSearchButtonClick} variant="contained">
          Get Weather
        </Button>
      </Container>
      {error && (
        <Typography color="error" sx={{ marginTop: '10px' }}>
          {error}
        </Typography>
      )}
      {isLoading ? (
        <Container>
          <Skeleton width={300} sx={{ margin: '40px 40px 0' }} />
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: '50px !important',
              gap: '20px',
            }}
          >
            <Skeleton
              variant="circular"
              width={50}
              height={50}
              sx={{ margin: '30px 0' }}
            />
            <Box sx={{ marginLeft: '30px' }}>
              <Skeleton width={100} />
              <Skeleton width={100} />
              <Skeleton width={100} />
              <Skeleton width={100} />
            </Box>
          </Container>
        </Container>
      ) : (
        currentWeatherData && (
          <>
            <Container sx={{ marginTop: '30px' }}>
              <Typography variant="h5">
                Current weather in {currentWeatherData.name}
              </Typography>
              <Container
                sx={{ display: 'flex', flexDirection: 'row', margin: '10px 0' }}
              >
                <img
                  className="img"
                  src={`https://openweathermap.org/img/wn/${currentWeatherData?.weather[0]?.icon}@2x.png`}
                  alt=""
                />
                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginLeft: '10px',
                  }}
                >
                  <Typography className="text">
                    {currentWeatherData.weather[0].description}
                  </Typography>
                  <Typography className="text">
                    {isMobile ? 'temp' : 'temperature'}:{' '}
                    {Math.round(currentWeatherData.main.temp)}&#8451;
                  </Typography>
                  <Typography className="text">
                    {isMobile ? 'wind' : 'wind speed'}:{' '}
                    {Math.round(currentWeatherData.wind.speed)} m/sec
                  </Typography>
                  <Typography className="text">
                    {isMobile ? 'hum' : 'humidity'}:{' '}
                    {currentWeatherData.main.humidity}%
                  </Typography>
                </Container>
              </Container>
            </Container>
            <div>
              <Link
                underline="none"
                variant="body2"
                onClick={handle5DayForecastLinkClick}
                sx={{ cursor: 'pointer' }}
              >
                Show weather forecast for 5 days
              </Link>
            </div>
          </>
        )
      )}
    </main>
  );
}

export default App;
