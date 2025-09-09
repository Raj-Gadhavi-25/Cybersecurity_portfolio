import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SpeedInsights } from '@vercel/speed-insights/react'  // ✅ import here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* Only run in production */}
    {import.meta.env.PROD && <SpeedInsights />}
  </StrictMode>,
)
