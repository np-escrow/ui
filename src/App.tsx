import { useEffect, Suspense, lazy, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import cn from 'classnames'

import { useTranslation } from 'react-i18next'

import useExpand from './hooks/useExpand'

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));

function App() {
  const { i18n } = useTranslation();
  const { handleExpand, isExpanded } = useExpand();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!isExpanded) handleExpand();
    if (Telegram.WebApp) {
      const version = Telegram.WebApp.version;
      const platform = Telegram.WebApp.platform;

      const isMobileDevice = platform === 'ios' || platform === 'android';
      setIsMobile(isMobileDevice);
      
      if (isMobileDevice && Number(version) >= 8 && typeof (Telegram.WebApp as any).requestFullscreen === 'function') {
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
      <Suspense>
        <div className={cn("h-screen", {"mobile-padding": isMobile})}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Suspense>
  )
}

export default App
