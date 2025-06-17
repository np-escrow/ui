import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './i18n'
import { BrowserRouter } from 'react-router-dom'
import Icons from './components/Icons/Icons.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Icons />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
