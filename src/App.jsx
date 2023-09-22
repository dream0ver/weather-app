import { useEffect, useState } from "react"
import { useGeolocated } from "react-geolocated"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Controls from "./components/Controls/Controls"
import Home from "./components/Home/Home"
import Loader from "./components/Loader/Loader"
import { fetch5DayForecast, fetchCurrentWeather } from "./endpoints"
function App() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false
      },
      userDecisionTimeout: 5000
    })
  const [search, setSearch] = useState("mumbai")
  const [info, setInfo] = useState({})
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMetricUnit, setIsMetricUnit] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [useCoords, setUseCoords] = useState({})
  const fetchInfo = () => {
    Promise.all([
      fetchCurrentWeather(
        search,
        isMetricUnit,
        useCoords?.flag,
        useCoords?.lat,
        useCoords?.lon
      ),
      fetch5DayForecast(
        search,
        isMetricUnit,
        useCoords?.flag,
        useCoords?.lat,
        useCoords?.lon
      )
    ])
      .then(res =>
        setInfo({
          weather: res[0].data,
          forecast: res[1].data
        })
      )
      .catch(err => {
        console.error(err)
        toast.error(
          err?.response?.data?.message ||
            "Error occurred while fetching weather data"
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    if (!search) return
    setIsLoading(true)
    fetchInfo()
  }, [search, isMetricUnit, useCoords])

  const onSearch = e => {
    if (e.key !== "Enter") return
    setSearch(e.target.value)
    setUseCoords({})
    setIsSearchOpen(false)
  }

  const geolocate = () => {
    if (!isGeolocationAvailable) {
      return toast.error("Your browser does not support Geolocation feature.")
    }
    if (!isGeolocationEnabled) {
      return toast.error(
        "Please Allow Geolocation Permission to use this feature."
      )
    }
    setUseCoords({
      flag: true,
      lat: coords.latitude,
      lon: coords.longitude
    })
  }

  const controlsProps = {
    info,
    isSearchOpen,
    setIsSearchOpen,
    isMetricUnit,
    setIsMetricUnit,
    onSearch,
    geolocate
  }
  const homeProps = {
    info,
    isMetricUnit
  }
  return (
    <section className="app-container">
      <div>
        <Loader isLoading={isLoading} />
        <Controls {...controlsProps} />
        <Home {...homeProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </section>
  )
}

export default App
