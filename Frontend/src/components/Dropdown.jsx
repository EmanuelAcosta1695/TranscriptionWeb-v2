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
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Español')} href="#">Spanish</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Inglés')} href="#">English</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Italiano')} href="#">Italian</a>  
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Francés')} href="#">French</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Alemán')} href="#">German</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Árabe')} href="#">Arab</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Japonés')} href="#">Japanese</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Coreano')} href="#">Korean</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Chino Mandarín')} href="#">Mandarin Chinese</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Chino Tradicional')} href="#">Traditional Chinese</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Ruso')} href="#">Russian</a>
            </div>
        </div>
    );
};



