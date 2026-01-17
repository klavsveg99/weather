import type { WeatherData } from '../types/weather'
import type { Language } from '../utils/i18n'
import { translations } from '../utils/i18n'
import { getWeatherIcon } from '../utils/weatherCodes'
import ForecastDisplay from './ForecastDisplay'

type WeatherDisplayProps = {
  weather: WeatherData
  language: Language
}

export default function WeatherDisplay({ weather, language }: WeatherDisplayProps) {
  const t = translations[language]

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const formatCurrentTime = (timeString: string) => {
    try {
      // Handle ISO format time strings like "2026-01-17T14:30"
      const date = new Date(timeString + 'Z')
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    } catch (e) {
      return 'N/A'
    }
  }

  return (
    <div className="weather-display">
      <div className="location">
        <h2>{weather.city}, {weather.country}</h2>
        <p className="coordinates">
          {Math.abs(weather.latitude).toFixed(2)}° {weather.latitude >= 0 ? 'N' : 'S'}, {Math.abs(weather.longitude).toFixed(2)}° {weather.longitude >= 0 ? 'E' : 'W'}
        </p>
      </div>

      <div className="main-info">
        <div className="temperature-section">
          <div className="icon">{getWeatherIcon(weather.weatherCode)}</div>
          <div className="temperature">
            <div className="temp">{weather.temperature}°C</div>
            <div className="description">{weather.weatherDescription}</div>
            <div className="feels-like">{t.feelsLike} {weather.feelsLike}°C</div>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-card">
            <div className="detail-label">{t.humidity}</div>
            <div className="detail-value">{weather.humidity}%</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">{t.windSpeed}</div>
            <div className="detail-value">{weather.windSpeed} km/h</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">{t.visibility}</div>
            <div className="detail-value">{weather.visibility} km</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">{t.precipitation}</div>
            <div className="detail-value">{weather.precipitation} mm</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">{t.uvIndex}</div>
            <div className="detail-value">{weather.uvIndex}</div>
          </div>

          <div className="detail-card">
            <div className="detail-label">{t.sunset}</div>
            <div className="detail-value">{formatTime(weather.sunset)}</div>
          </div>
        </div>
      </div>

      <ForecastDisplay forecast={weather.forecast} language={language} />
    </div>
  )
}
