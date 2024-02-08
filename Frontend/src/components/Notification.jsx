import React, { useState, useEffect } from 'react';

export const Notification = ({ message }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!isVisible) {
        return null;
    }

    return (
        <div style={{ position: 'fixed', top: '10%', left: '0.5%', backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }}>
            <span>{message}</span>
            {/* <button onClick={() => setIsVisible(false)}>X</button> */}
        </div>
    );
};
