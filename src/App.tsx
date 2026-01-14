import { useState, useEffect } from 'react'
import './App.css'
import WeatherDisplay from './components/WeatherDisplay'
import SearchBar from './components/SearchBar'
import { getWeatherData } from './services/weatherApi'
import type { WeatherData } from './types/weather'

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchCity, setSearchCity] = useState('New York')

  useEffect(() => {
    fetchWeather(searchCity)
  }, [])

  const fetchWeather = async (city: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getWeatherData(city)
      setWeather(data)
      setSearchCity(city)
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (city: string) => {
    if (city.trim()) {
      fetchWeather(city)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Weather App</h1>
        <SearchBar onSearch={handleSearch} />
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {weather && <WeatherDisplay weather={weather} />}
      </div>
    </div>
  )
}

export default App
