import React, { useState, useEffect } from 'react';

export const Notification = ({ message }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Si hay un mensaje, mostramos la notificación
        if (message) {
            setIsVisible(true);

            // Ocultamos la notificación después de 3 segundos
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            // Limpiamos el temporizador para evitar fugas de memoria
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Si isVisible es false, no mostramos la notificación
    if (!isVisible) {
        return null;
    }

    // Si isVisible es true, mostramos la notificación
    return (
        <div style={{ position: 'fixed', top: '10%', left: '0.5%', backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }}>
            <span>{message}</span>
            {/* <button onClick={() => setIsVisible(false)}>X</button> */}
        </div>
    );
};
