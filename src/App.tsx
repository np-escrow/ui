import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useExpand from './hooks/useExpand'
import { useTranslation } from 'react-i18next'

function App() {
  const { t, i18n } = useTranslation();
  const { handleExpand, isExpanded } = useExpand();

  useEffect(() => {
    if (!isExpanded) handleExpand();
    if (Telegram.WebApp) {
      const version = Telegram.WebApp.version;
      const platform = Telegram.WebApp.platform;

      const isMobile = platform === 'ios' || platform === 'android';
      
      if (isMobile && Number(version) >= 8 && typeof (Telegram.WebApp as any).requestFullscreen === 'function') {
        (Telegram.WebApp as any).requestFullscreen();
      }

      const lang = Telegram.WebApp.initDataUnsafe?.user?.language_code;
      if (lang) {
        const targetLang = lang === 'uk' || lang === 'ru' ? lang : 'en';
        i18n.changeLanguage(targetLang);
      }
    }
  }, [handleExpand, isExpanded, i18n]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{t('welcome')}</h1>
      <div className="card">
        <p>{t('description')}</p>
      </div>
      <p className="read-the-docs">
        {Telegram.WebApp.initDataUnsafe?.user?.language_code}
      </p>
    </>
  )
}

export default App
