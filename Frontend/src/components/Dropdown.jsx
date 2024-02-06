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
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Español')} href="#">Español</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Inglés')} href="#">Inglés</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Italiano')} href="#">Italiano</a>  
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Francés')} href="#">Francés</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Alemán')} href="#">Alemán</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Árabe')} href="#">Árabe</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Japonés')} href="#">Japonés</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Coreano')} href="#">Coreano</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Chino Mandarín')} href="#">Chino Mandarín</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Chino Tradicional')} href="#">Chino Tradicional</a>
                <a className="dropdown-item" onClick={() => handleLanguageSelection('Ruso')} href="#">Ruso</a>
            </div>
        </div>
    );
};