import React from 'react'
import allowedExtensions from '../../utils/allowedExtensions.json'
import { SelectFileProps } from './selectFileType'

export const SelectFile = ({
  handleDrop,
  handleDragOver,
  handleInputChange,
}: SelectFileProps) => {
  return (
    <label
      htmlFor="audio-upload"
      className="drop-zone"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ cursor: 'pointer', color: 'white' }}
    >
      Drag and drop an audio file here or click to upload
      <br />
      <button
        className="btn btn-primary btn-sm mt-2 mb-0"
        onClick={() => document.getElementById('audio-upload')?.click()}
      >
        +
      </button>
      <input
        type="file"
        accept={allowedExtensions['allowed-extensions']}
        onChange={handleInputChange}
        style={{ display: 'none' }}
        id="audio-upload"
      />
    </label>
  )
}
