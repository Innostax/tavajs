import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import React, { useState, useEffect } from 'react'
import { THEMES } from './dark-theme.constants'

const THEME = 'theme'

export const DarkToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const isDarkThemeSelected = localStorage.getItem(THEME) === THEMES.DARK
    setIsDarkTheme(isDarkThemeSelected)

    if (isDarkThemeSelected)
      document.documentElement.classList.add(THEMES.DARK)
    else document.documentElement.classList.remove(THEMES.DARK)
  }, [])

  const handleThemeChange = (isChecked) => {
    if (isChecked) document.documentElement.classList.add(THEMES.DARK)
    else document.documentElement.classList.remove(THEMES.DARK)

    const selectedTheme = isChecked ? THEMES.DARK : THEMES.LIGHT
    localStorage.setItem(THEME, selectedTheme)
    setIsDarkTheme(isChecked)
  }

  return (
    <BootstrapSwitchButton
      className='DarkToggle'
      checked={isDarkTheme}
      width={50}
      offlabel='🌙'
      onlabel='🔆'
      onstyle='secondary'
      onChange={(event) => handleThemeChange(event)}
      aria-label='Dark mode'
    />
  )
}
