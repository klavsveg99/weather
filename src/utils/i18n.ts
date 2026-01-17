export type Language = 'en' | 'lv'

export const translations = {
  en: {
    title: 'Weather App',
    searchPlaceholder: 'Enter city name...',
    searchButton: 'Search',
    loading: 'Loading...',
    error: 'Failed to fetch weather data. Please try again.',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    visibility: 'Visibility',
    precipitation: 'Precipitation',
    uvIndex: 'UV Index',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    feelsLike: 'Feels like',
    forecast: '7-Day Forecast',
    localTime: 'Local Time',
    dayLength: 'Day Length'
  },
  lv: {
    title: 'Laika Prognoze',
    searchPlaceholder: 'Ievadiet pilsētas nosaukumu...',
    searchButton: 'Meklēt',
    loading: 'Ielādē...',
    error: 'Neizdevās iegūt laika datus. Lūdzu, mēģiniet vēlreiz.',
    humidity: 'Mitrums',
    windSpeed: 'Vēja ātrums',
    visibility: 'Redzamība',
    precipitation: 'Nokrišņi',
    uvIndex: 'UV indekss',
    sunrise: 'Saule aust',
    sunset: 'Saule noriet',
    feelsLike: 'Jūtas kā',
    forecast: '7 dienu prognoze',
    localTime: 'Lokālais laiks',
    dayLength: 'Dienas garums'
  }
}
