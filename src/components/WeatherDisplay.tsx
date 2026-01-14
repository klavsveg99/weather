import type { WeatherData } from '../types/weather'
import { getWeatherIcon } from '../utils/weatherCodes'

type WeatherDisplayProps = {
  weather: WeatherData
}

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="weather-display">
      <div className="location">
        <h2>{weather.city}, {weather.country}</h2>
        <p className="coordinates">
          {weather.latitude.toFixed(2)}° N, {Math.abs(weather.longitude).toFixed(2)}° W
        </p>
      </div>

      <div className="main-info">
        <div className="temperature-section">
          <div className="icon">{getWeatherIcon(weather.weatherCode)}</div>
          <div className="temperature">
            <div className="temp">{weather.temperature}°F</div>
            <div className="description">{weather.weatherDescription}</div>
            <div className="feels-like">Feels like {weather.feelsLike}°F</div>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-card">
            <div className="detail-label">Humidity</div>
            <div className="detail-value">{weather.humidity}%</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">Wind Speed</div>
            <div className="detail-value">{weather.windSpeed} mph</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">Visibility</div>
            <div className="detail-value">{weather.visibility} km</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">Precipitation</div>
            <div className="detail-value">{weather.precipitation} mm</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">UV Index</div>
            <div className="detail-value">{weather.uvIndex}</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">Sunrise</div>
            <div className="detail-value">{formatTime(weather.sunrise)}</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">Sunset</div>
            <div className="detail-value">{formatTime(weather.sunset)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
