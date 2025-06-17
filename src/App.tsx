import { useEffect, Suspense, lazy, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import cn from 'classnames'

import { useTranslation } from 'react-i18next'

import useExpand from './hooks/useExpand'
import { useUserStore } from './store/userStore'
import { useUIStore } from './store/uiStore'
import { EUserType, EUserLanguage, EPlatform } from './types'
import { Header } from './components/Header'

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));

function App() {
  const { i18n } = useTranslation();
  const { handleExpand, isExpanded } = useExpand();
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const setUserType = useUserStore((state) => state.setUserType);
  const setLanguage = useUserStore((state) => state.setLanguage);
  const setPlatform = useUserStore((state) => state.setPlatform);
  const setUsername = useUserStore((state) => state.setUsername);
  const showHeader = useUIStore((state) => state.showHeader);

  useEffect(() => {
    if (!isExpanded) handleExpand();
    if (Telegram.WebApp) {
      const version = Telegram.WebApp.version;
      const platform = Telegram.WebApp.platform as EPlatform;

      // Platform
      if (platform) setPlatform(platform);

      const isMobileDevice = platform === EPlatform.IOS || platform === EPlatform.ANDROID;
      setIsMobile(isMobileDevice);
      
      if (isMobileDevice && Number(version) >= 8 && typeof (Telegram.WebApp as any).requestFullscreen === 'function') {
        (Telegram.WebApp as any).requestFullscreen();
      }

      // Username
      const username = Telegram.WebApp.initDataUnsafe?.user?.username;
      setUsername(username);

      // User type
      const params = new URLSearchParams(location.search);
      const userType = params.has('recepient') ? EUserType.RECIPIENT : EUserType.SELLER;
      setUserType(userType);

      // Language
      const lang = Telegram.WebApp.initDataUnsafe?.user?.language_code;
      let targetLang: EUserLanguage = EUserLanguage.EN;
      if (lang === 'uk') targetLang = EUserLanguage.UK;
      else if (lang === 'ru') targetLang = EUserLanguage.RU;
      setLanguage(targetLang);
      i18n.changeLanguage(targetLang.toLowerCase());
    }
  }, [handleExpand, isExpanded, i18n, location.search, setUserType, setLanguage, setPlatform, setUsername]);

  return (
      <Suspense>
        <div className={cn("h-screen", {"mobile-padding": isMobile})}>
          {showHeader && <Header />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Suspense>
  )
}

export default App
