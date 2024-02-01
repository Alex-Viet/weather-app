import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = 'b797f76a31b14512594467257d50db94';

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(
      baseUrl + city, {
        params: {
          units: 'metric',
          appid: API_KEY
        }
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
