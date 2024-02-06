import React from 'react'

export const SelectFile = ({handleDrop, handleDragOver, handleFileChange}) => {
    return (
        <label
            htmlFor="audio-upload"
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ cursor: 'pointer', color: 'white' }}
        >
            Arrastra y suelta un archivo de audio aquí o haz clic para cargar
            <br />
            <button className='btn btn-primary btn-sm mt-2 mb-0' onClick={() => document.getElementById('audio-upload').click()}>+</button>
            <input
                type="file"
                accept=".wav, .aiff, .aif, .flac, .mp3"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="audio-upload"
            />
        </label>
    )
}
