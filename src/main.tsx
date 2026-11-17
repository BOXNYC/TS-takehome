import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'
import SharePage from './components/SharePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* feat: single-route check instead of adding a router dependency */}
    {window.location.pathname === '/share' ? <SharePage /> : <App />}
  </StrictMode>,
)
