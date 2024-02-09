import React, { useState } from 'react';

export const Dropdown = ({ onLanguageChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLanguageSelection = (selectedLanguage) => {
        setLanguage(selectedLanguage)
        onLanguageChange(selectedLanguage); // Llama a la función de devolución de llamada con el idioma seleccionado
        setIsOpen(false); // Cerrar el menú desplegable después de seleccionar el idioma
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-success dropdown-toggle"
                type="button"
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isOpen ? "true" : "false"}
            >
                {language || 'Idioma'}
            </button>
            <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Spanish')} href="#">Spanish</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('English')} href="#">English</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Italian')} href="#">Italian</a>  
                <a className="dropdown-item" onClick={() => handleLanguageSelection('French')} href="#">French</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('German')} href="#">German</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Arab')} href="#">Arab</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Japanese')} href="#">Japanese</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Korean')} href="#">Korean</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Mandarin Chinese')} href="#">Mandarin Chinese</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Traditional Chinese')} href="#">Traditional Chinese</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Russian')} href="#">Russian</a>
            </div>
        </div>
    );
};