import type { WeatherData, GeocodingResult } from '../types/weather'
import { getWeatherDescription } from '../utils/weatherCodes'

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

export async function geocodeCity(city: string): Promise<GeocodingResult> {
  const params = new URLSearchParams({
    name: city,
    count: '1',
    language: 'en',
    format: 'json'
  })

  const response = await fetch(`${GEOCODING_API}?${params}`)
  if (!response.ok) throw new Error('Failed to geocode city')

  const data = await response.json()
  if (!data.results || data.results.length === 0) {
    throw new Error('City not found')
  }

  const result = data.results[0]
  return {
    name: result.name,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude
  }
}

export async function getWeatherData(city: string): Promise<WeatherData> {
  try {
    const location = await geocodeCity(city)

    const params = new URLSearchParams({
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,weather_code,visibility,uv_index',
      daily: 'sunset,temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,wind_speed_10m_max',
      timezone: 'auto',
      temperature_unit: 'celsius',
      wind_speed_unit: 'kmh'
    })

    const response = await fetch(`${WEATHER_API}?${params}`)
    if (!response.ok) throw new Error('Failed to fetch weather')

    const data = await response.json()
    const current = data.current
    const daily = data.daily

    const forecast = daily.time.map((date: string, index: number) => ({
      date,
      maxTemp: Math.round(daily.temperature_2m_max[index]),
      minTemp: Math.round(daily.temperature_2m_min[index]),
      weatherCode: daily.weather_code[index],
      weatherDescription: getWeatherDescription(daily.weather_code[index]),
      precipitation: daily.precipitation_sum[index],
      windSpeed: Math.round(daily.wind_speed_10m_max[index])
    }))

    return {
      city: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      weatherCode: current.weather_code,
      weatherDescription: getWeatherDescription(current.weather_code),
      sunset: daily.sunset[0],
      precipitation: current.precipitation,
      uvIndex: Math.round(current.uv_index * 10) / 10,
      visibility: Math.round(current.visibility / 1000),
      forecast
    }
  } catch (error) {
    throw error
  }
}
