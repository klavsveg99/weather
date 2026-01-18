# Weather App

A modern, responsive weather application built with React and TypeScript. This project demonstrates my skills as a junior React developer and showcases best practices in component architecture, state management, and API integration.

## Live Preview

https://weather-mu-two-17.vercel.app/

## Features

- Real-time weather data from external API
- City search functionality for any location
- Multi-language support (English and Latvian)
- Responsive design for desktop and mobile
- Loading states and error handling
- Full TypeScript implementation

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS3
- ESLint

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── WeatherDisplay.tsx
│   ├── SearchBar.tsx
│   └── ForecastDisplay.tsx
├── services/           # API integration
│   └── weatherApi.ts
├── types/              # TypeScript type definitions
│   └── weather.ts
├── utils/              # Utility functions
│   ├── i18n.ts         # Translations
│   └── weatherCodes.ts
└── App.tsx            # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/klavsveg99/weather-app.git
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Future Enhancements

- Geolocation-based weather detection
- Weather animations and visual effects
- Unit conversion (Celsius/Fahrenheit)
- Weather history and favorites
