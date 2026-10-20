import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ViewportProvider } from './hooks/useViewport.js'
import './styles/tokens.css'
import './styles/app.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ViewportProvider>
      <App />
    </ViewportProvider>
  </React.StrictMode>
)
