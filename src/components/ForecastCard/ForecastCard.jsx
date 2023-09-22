import styles from "./ForecastCard.module.scss"
export default function ForecastCard({ info, isMetricUnit }) {
  const getImage = () => {
    return new URL(
      `../../assets/${info?.weather[0]?.icon}.svg`,
      import.meta.url
    ).href
  }
  const getDate = () => {
    const d = new Date(info?.dt * 1000)
    const arr = d.toString().split(" ")
    const time = arr[4].split(":")
    return `${arr[1]} ${arr[2]}, ${Number(time[0])}:${Number(time[1])}`
  }

  const getWeather = () => {
    return `${info?.weather[0]?.main}, ${info?.main?.temp}°${
      isMetricUnit ? "C" : "F"
    }`
  }
  return (
    <div className={styles.card}>
      <span>{getDate()}</span>
      <img
        className={styles.forecast_img}
        src={getImage()}
      />
      <span>{getWeather()}</span>
    </div>
  )
}
