export interface ForecastDay {
  date: string
  maxTemp: number
  minTemp: number
  weatherCode: number
  weatherDescription: string
  precipitation: number
  windSpeed: number
}

export interface WeatherData {
  city: string
  country: string
  latitude: number
  longitude: number
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  weatherCode: number
  weatherDescription: string
  sunrise: string
  sunset: string
  precipitation: number
  uvIndex: number
  visibility: number
  currentTime: string
  dayLength: string
  forecast: ForecastDay[]
}

export interface GeocodingResult {
  name: string
  country: string
  latitude: number
  longitude: number
}
