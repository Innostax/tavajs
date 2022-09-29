import React, { useState, useEffect } from 'react'
import { THEMES } from './theme.constants'

<% if(isBootstrap) {%>
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
<%}%>
const THEME = 'theme'

export const ThemeToggler = () => {
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
    <% if(isBootstrap) {%>
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
    <%}%>
    <% if(isTailWind) {%>
      <>
			<label
				htmlFor='default-toggle'
				className='inline-flex relative items-center cursor-pointer'
			>
				<input
					type='checkbox'
					defaultChecked={isDarkTheme}
					onChange={() => {
						handleThemeChange(!isDarkTheme)
					}}
					id='default-toggle'
					className='sr-only peer'
				/>
				<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
			</label>
		</>
    <%}%>
  )
}
