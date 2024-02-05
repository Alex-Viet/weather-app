import axios from 'axios';

const weatherApiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?q=' + city,
      {
        params: {
          units: 'metric',
          appid: weatherApiKey,
        },
      },
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const get5DaysWeatherForecastData = async (city) => {
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast?q=' + city,
      {
        params: {
          units: 'metric',
          appid: weatherApiKey,
        },
      },
    );

    return response;
  } catch (error) {
    return error;
  }
};
