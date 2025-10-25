import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Titulo from './titulo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Titulo />
    <Titulo titulo = 'Outro Título' />
    <App />   

  </StrictMode>,
)
