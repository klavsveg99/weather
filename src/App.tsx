import { useState, useEffect } from 'react'
import './App.css'
import WeatherDisplay from './components/WeatherDisplay'
import SearchBar from './components/SearchBar'
import { getWeatherData } from './services/weatherApi'
import type { WeatherData } from './types/weather'
import type { Language } from './utils/i18n'
import { translations } from './utils/i18n'

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchCity, setSearchCity] = useState('New York')
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved === 'en' || saved === 'lv') ? saved : 'en'
  })

  const t = translations[language]

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
      setError(t.error)
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

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'lv' : 'en'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>{t.title}</h1>
          <button className="language-toggle" onClick={toggleLanguage}>
            {language === 'en' ? 'LV' : 'EN'}
          </button>
        </div>
        <SearchBar onSearch={handleSearch} language={language} />
        {loading && <div className="loading">{t.loading}</div>}
        {error && <div className="error">{error}</div>}
        {weather && <WeatherDisplay weather={weather} language={language} />}
      </div>
    </div>
  )
}

export default App
