import React, { useState } from 'react';
import { Notification } from './components/Notification';
import { ShowSelectedFile } from './components/ShowSelectedFile';
import { SelectFile } from './components/SelectFile';

export const TranscriptionApp = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedExtensions = ['.wav', '.aiff', '.aif', '.flac', '.mp3'];

        if (file) {
            const extension = '.' + file.name.split('.').pop();

            if (!allowedExtensions.includes(extension)) {
                alert('El archivo seleccionado no es válido. Por favor, selecciona un archivo con una extensión válida.');
                event.target.value = null; // Limpia el valor del input file
                return;
            }
        }
        
        setAudioFile(file);
        setNotificationMessage('Archivo cargado con éxito');
        setShowNotification(true); // Mostrar la notificación cuando se carga el archivo
        
        setTimeout(() => {
            setNotificationMessage(null);
            setShowNotification(false); // Ocultar la notificación después de 3 segundos
        }, 3000);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        
        setAudioFile(file);
        setNotificationMessage('Archivo cargado con éxito');
        setShowNotification(true); // Mostrar la notificación cuando se carga el archivo
        
        setTimeout(() => {
            setNotificationMessage(null);
            setShowNotification(false); // Ocultar la notificación después de 3 segundos
        }, 3000);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const clearFileAndNotification = () => {
        setAudioFile(null);
        setNotificationMessage(null);
        setShowNotification(false); // Ocultar la notificación al eliminar el archivo
    };

    return (
        <div className="app-container">
            <div className="left-band"></div>
            
            <div className="content">
                {!audioFile ? (
                    <SelectFile 
                        handleDrop={handleDrop} 
                        handleDragOver={handleDragOver} 
                        handleFileChange={handleFileChange}
                    />
                ) : (
                    <ShowSelectedFile clearFileAndNotification={clearFileAndNotification} audioFile={audioFile} setAudioFile={setAudioFile}/>
                )}
                
                {showNotification && <Notification message={notificationMessage} />}

                <br />
                <div className='box'>
                    <ul>
                        <li style={{ marginBottom: '10px' }}>Solo se transcribirán perfectamente archivos de audio sin ruido de fondo.</li>
                        <li style={{ marginBottom: '10px' }}>Las extensiones soportadas son: <br />.wav, .aiff, .aif, .flac</li>
                    </ul>
                </div>
            </div>

            <div className="right-band"></div>
        </div>
    );
};
