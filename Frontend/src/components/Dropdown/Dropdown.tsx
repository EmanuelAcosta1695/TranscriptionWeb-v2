import React, { useState } from 'react'
import { onLanguageChange } from './onLanguageChange'
import { languages } from '../../utils/allowedLangauges'

export const Dropdown = ({ onLanguageChange }: onLanguageChange) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>('')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLanguageSelection = (selectedLanguage: string) => {
    setLanguage(selectedLanguage)
    onLanguageChange(selectedLanguage) // Calls the callback function with the selected language
    setIsOpen(false) // Close dropdown menu after selecting language
  }

  return (
    <div className="dropdown relative flex flex-col justify-center items-center">
      <button
        className="btn btn-success dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        {language || 'Idioma'}
      </button>
      <div
        className={`dropdown-menu absolute mt-2 ${isOpen ? 'show' : ''}`}
        style={{ justifyContent: 'center' }}
      >
        {languages.map((languageAllow) => (
          <a
            key={languageAllow}
            className="dropdown-item"
            onClick={() => handleLanguageSelection(languageAllow)}
            href="#"
          >
            {languageAllow}
          </a>
        ))}
      </div>
    </div>
  )
}
