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
}

export interface GeocodingResult {
  name: string
  country: string
  latitude: number
  longitude: number
}
