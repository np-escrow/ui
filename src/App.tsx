import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useExpand from './hooks/useExpand'

function App() {
  const [count, setCount] = useState(0)
  const {handleExpand, isExpanded} = useExpand();

  useEffect(() => {
    if (Telegram.WebApp) {
      const version = Telegram.WebApp.version;
      Telegram.WebApp.ready();
      if (!isExpanded) handleExpand();
      if (Number(version) >= 8 && typeof (Telegram.WebApp as any).requestFullscreen === 'function') (Telegram.WebApp as any).requestFullscreen();
    }
  }, [handleExpand, isExpanded]);

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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
