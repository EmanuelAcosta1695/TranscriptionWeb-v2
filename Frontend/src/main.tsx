import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TranscriptionApp } from './pages/TranscriptionApp'
import { Navbar } from './components/Navbar/Navbar'
import { AboutPage } from './pages/AboutPage'
import './index.css'

// El operador de afirmación no nulo ! en TypeScript le indica al compilador que confías
// en que el valor no será null o undefined en ese punto, aunque el compilador no pueda verificarlo
// por sí mismo. Esto se conoce como una "assertion" o afirmación no nula.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <Navbar />
      <div className="app-container">
        <div className="left-band"></div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TranscriptionApp />
              </>
            }
          />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <div className="right-band"></div>
      </div>
    </React.StrictMode>
  </BrowserRouter>
)
