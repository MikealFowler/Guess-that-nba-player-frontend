import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SubmitPLayer from './submit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SubmitPLayer />
  </StrictMode>,
)
