import { useState, useEffect } from 'react'
import type { ForecastDay } from '../types/weather'
import type { Language } from '../utils/i18n'
import { translations } from '../utils/i18n'
import { getWeatherIcon } from '../utils/weatherCodes'

type ForecastDisplayProps = {
  forecast: ForecastDay[]
  language: Language
}

export default function ForecastDisplay({ forecast, language }: ForecastDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
  const t = translations[language]

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const cardsToShow = isMobile ? 1 : 3
  const maxIndex = Math.max(0, forecast.length - cardsToShow)

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
  }

  const visibleDays = forecast.slice(currentIndex, currentIndex + cardsToShow)

  return (
    <div className="forecast-display">
      <h3 className="forecast-title">{t.forecast || 'Forecast'}</h3>
      
      <div className="forecast-container">
        <button 
          className="forecast-nav forecast-nav-prev" 
          onClick={handlePrevious}
          aria-label="Previous days"
        >
          ←
        </button>

        <div className="forecast-cards">
          {visibleDays.map((day, index) => (
            <div key={currentIndex + index} className="forecast-card">
              <div className="forecast-date">{formatDate(day.date)}</div>
              <div className="forecast-icon">{getWeatherIcon(day.weatherCode)}</div>
              <div className="forecast-temps">
                <div className="forecast-temp-max">{day.maxTemp}°</div>
                <div className="forecast-temp-min">{day.minTemp}°</div>
              </div>
              <div className="forecast-desc">{day.weatherDescription}</div>
              <div className="forecast-details">
                <div className="forecast-detail-item">
                  <div className="forecast-detail-label">Wind</div>
                  <div className="forecast-detail-value">{day.windSpeed}km</div>
                </div>
                <div className="forecast-detail-item">
                  <div className="forecast-detail-label">Rain</div>
                  <div className="forecast-detail-value">{day.precipitation.toFixed(1)}mm</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="forecast-nav forecast-nav-next" 
          onClick={handleNext}
          aria-label="Next days"
        >
          →
        </button>
      </div>

      <div className="forecast-dots">
        {forecast.map((_, index) => {
          if (index > maxIndex) return null
          return (
            <button
              key={index}
              className={`forecast-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to day ${index + 1}`}
            />
          )
        })}
      </div>
    </div>
  )
}
