import { useEffect, useState } from 'react'

export const useKeyboardStatus = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [minScreenHeight, setMinScreenHeight] = useState(0)

  useEffect(() => {
    const checkKeyboard = () => {
      const currentHeight = window.Telegram.WebApp.viewportHeight
      const isOpen = currentHeight < window.screen.height * 0.8
      setIsKeyboardOpen(isOpen)
      setMinScreenHeight(isOpen ? window.screen.height * 0.8 : currentHeight)
    }

    window.addEventListener('resize', checkKeyboard)

    return () => {
      window.removeEventListener('resize', checkKeyboard)
    }
  }, [])

  return { isKeyboardOpen, minScreenHeight }
}
