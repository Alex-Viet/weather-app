# Weather forecast widget in React + Vite
The application is developed to view the weather. You need to enter a city, then the temperature, wind speed, humidity, and weather conditions icon are displayed. When you click the link, a window opens with a 5-day forecast, with the ability to view the forecast for the next 5 days in 3-hour increments.

Project deployment: [Weather app](https://ephemeral-cascaron-0cc54f.netlify.app)

The application uses the environment variable VITE_REACT_APP_WEATHER_API_KEY, where you need to place the api key. To get it, you must first register on the website https://openweathermap.org/, then get a key.

To clone the repository, run the command:
`git clone https://github.com/Alex-Viet/weather-app`

To install dependencies:
`npm install`

To run the project in developer mode:
`npm run dev`<br>
The project will be available locally at: http://localhost:5173

To run the project in pre-deployment mode:
`npm run preview`<br>
The project will be available locally at: http://localhost:4173

## Language and technologies:
- Programming language: JavaScript
- Vite
- React
- Sass
- Eslint
- Prettier

### Third party libraries:
- axios, material UI

## Purpose of project folders:
/components - reused react components,<br>
/api - api requests,<br>
/styles - styles,<br>
/utils - auxiliary functions
