import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GlobeStyleProvider } from './globe/GlobeStyleContext'
import { LanguageProvider } from './i18n/LanguageContext'
import { ThemeProvider } from './theme/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <GlobeStyleProvider>
          <App />
        </GlobeStyleProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
