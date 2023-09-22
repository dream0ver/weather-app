import axios from "axios"

const APP_ID = import.meta.env.VITE_API_KEY

const fetchCurrentWeather = (city, isMetric, useCoords, lat, lon) => {
  const url = useCoords
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=${
        isMetric ? "metric" : "imperial"
      }`
    : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}&units=${
        isMetric ? "metric" : "imperial"
      }`
  return axios.get(url)
}

const fetch5DayForecast = (city, isMetric, useCoords, lat, lon) => {
  const url = useCoords
    ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=${
        isMetric ? "metric" : "imperial"
      }`
    : `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APP_ID}&units=${
        isMetric ? "metric" : "imperial"
      }`
  return axios.get(url)
}
export { fetchCurrentWeather, fetch5DayForecast }
