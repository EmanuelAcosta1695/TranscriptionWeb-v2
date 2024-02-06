import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { TranscriptionApp } from './TranscriptionApp.jsx'
import { Navbar } from './components/Navbar.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Navbar />
      <TranscriptionApp />
    </React.StrictMode>,
)
