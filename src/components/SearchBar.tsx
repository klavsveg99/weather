import { useState } from 'react'
import type { Language } from '../utils/i18n'
import { translations } from '../utils/i18n'

type SearchBarProps = {
  onSearch: (city: string) => void
  language: Language
}

const popularCities = ['New York', 'London', 'Tokyo', 'Riga', 'Paris', 'Berlin', 'Sydney'];

export default function SearchBar({ onSearch, language }: SearchBarProps) {
  const [input, setInput] = useState('')
  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(input)
    setInput('')
  }

  return (
    <>
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={t.searchPlaceholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        {t.searchButton}
      </button>
    </form>
    <div className="popular-cities">
      {popularCities.map((city) => (
        <button
        className="popular-city-button" 
        onClick={() => {
          onSearch(city);
          setInput(city)
        }}>
          {city}
        </button>
      ))}
    </div>
    </>
  )
}
