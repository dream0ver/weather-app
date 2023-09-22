import { useRef } from "react"
import ForecastCard from "../ForecastCard/ForecastCard"
import s from "./Home.module.scss"
export default function Home({ info, isMetricUnit }) {
  const hasData = !!Object.keys(info).length
  const scrollRef = useRef()

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 500
  }
  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 500
  }
  const location = () => {
    return `${info?.weather?.name}, ${info?.weather?.sys?.country}`
  }

  const temperature = () => {
    return `${info?.weather?.main?.temp?.toFixed(0)}°${
      isMetricUnit ? "C" : "F"
    }`
  }

  const humidity = () => {
    return `Humidity : ${info?.weather?.main?.humidity}%`
  }

  const pressure = () => {
    return `Pressure : ${info?.weather?.main?.pressure} millibars`
  }

  const windSpeed = () => {
    return `Wind : ${info?.weather?.wind?.speed} ${
      isMetricUnit ? "m/s" : "km/h"
    }`
  }

  const weatherDesc = () => {
    const d = new Date().toString().split(" ")
    return `${info?.weather?.weather[0]?.main}, ${d[1]} ${d[2]}`
  }

  const getImage = () => {
    return new URL(
      `../../assets/${info?.weather?.weather[0]?.icon}.svg`,
      import.meta.url
    ).href
  }

  return (
    <>
      {hasData && (
        <div className={s.container}>
          <span className={s.location_text}>{location()}</span>
          <div className={s.temp_info}>
            <span className={s.temp}>{temperature()}</span>
            <img
              className={s.desktop_image}
              src={getImage()}
            />
          </div>
          <div className={s.details_container}>
            <div className={s.details}>
              <span className={s.desc}>{weatherDesc()}</span>
              <div>
                <span className={s.desc_thin}>{humidity()}</span>
                <span className={s.desc_thin}>{pressure()}</span>
                <span className={s.desc_thin}>{windSpeed()}</span>
              </div>
            </div>
            <img
              className={s.mobile_image}
              src={getImage()}
            />
          </div>
          <div className={s.scroll_container}>
            <i
              className={s.arrow_left}
              onClick={scrollLeft}
            />
            <div
              className={s.view}
              ref={scrollRef}
            >
              {info?.forecast?.list?.map(d => (
                <ForecastCard
                  info={d}
                  isMetricUnit={isMetricUnit}
                />
              ))}
            </div>
            <i
              className={s.arrow_right}
              onClick={scrollRight}
            />
          </div>
        </div>
      )}
    </>
  )
}
