import React, { useState } from 'react';
import { Notification } from './components/Notification';
import { ShowSelectedFile } from './components/ShowSelectedFile';
import { SelectFile } from './components/SelectFile';
import { ClarificationComponent } from './components/ClarificationComponent';

export const TranscriptionApp = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedExtensions = ['.wav', '.aiff', '.aif', '.flac', '.mp3', '.ogg'];

        if (file) {
            const extension = '.' + file.name.split('.').pop();

            console.log('extension: ', extension)

            if (!allowedExtensions.includes(extension)) {
                alert('The selected file is not valid. Please select a file with a valid extension.');
                event.target.value = null;
                return;
            }
        }
        
        setAudioFile(file);
        setNotificationMessage('File uploaded successfully');
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
        setNotificationMessage('File uploaded successfully');
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
        <div className="content">
            {!audioFile ? (
                <>
                    <SelectFile 
                        handleDrop={handleDrop} 
                        handleDragOver={handleDragOver} 
                        handleFileChange={handleFileChange}
                    />

                    <ClarificationComponent/>
                </>
            ) : (
                <>
                    <ShowSelectedFile clearFileAndNotification={clearFileAndNotification} audioFile={audioFile} setAudioFile={setAudioFile}/>
                </>
            )}
            
            {showNotification && <Notification message={notificationMessage} />}

        </div>
    );
};
