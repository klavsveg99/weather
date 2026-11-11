# Weather

A responsive React and TypeScript weather app. Search for a city, see current conditions and a 7-day forecast, and switch the interface between English and Latvian.

**Live demo:** https://weather-mu-two-17.vercel.app/

## Features

- City search with geocoding and quick picks for popular cities
- Current conditions: temperature, feels like, description, humidity, wind, visibility, precipitation, UV index and sunset
- 7-day forecast with daily high and low temperatures, wind and rain
- English and Latvian interface, remembered in `localStorage`
- Loading and error states
- Responsive layout with a one-card forecast carousel on small screens
- No API key required

## Tech stack

- React 19
- TypeScript
- Vite
- Open-Meteo geocoding and forecast APIs
- CSS

## Getting started

Requirements: Node.js 18 or newer and npm.

```bash
git clone https://github.com/klavsveg99/weather.git
cd weather
npm install
npm run dev
```

Open http://localhost:5173. The app loads Riga by default.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## How it works

`src/services/weatherApi.ts` geocodes the searched city with Open-Meteo's geocoding API, then requests current conditions and a daily forecast for the returned coordinates. Weather codes are mapped to labels and icons in `src/utils/weatherCodes.ts`. The selected language is stored in `localStorage`.

## Project structure

```
src/
├── components/
│   ├── SearchBar.tsx
│   ├── WeatherDisplay.tsx
│   └── ForecastDisplay.tsx
├── services/
│   └── weatherApi.ts
├── types/
│   └── weather.ts
├── utils/
│   ├── i18n.ts
│   └── weatherCodes.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## Notes and limitations

- Temperatures are shown in Celsius, wind in km/h and visibility in kilometres.
- Data comes from the free Open-Meteo API and is subject to its availability and terms.
- Browser geolocation, unit switching, saved cities and hourly forecasts are not implemented.

## Possible next steps

- Detect the visitor's location with the browser geolocation API
- Add Celsius/Fahrenheit and km/h/mph switching
- Save favourite cities
- Add an hourly forecast and weather animations
- Add tests for API mapping, weather codes and translations
