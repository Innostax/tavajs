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
		<div
			role='checkbox'
			aria-checked={isDarkTheme}
			tabIndex={0}
			onClick={() => {
				handleThemeChange(!isDarkTheme)
			}}
			className={`cursor-pointer w-11 h-6 rounded-full relative px-1.5 flex items-center${
				isDarkTheme ? ' bg-blue-600' : ' justify-end bg-yellow-600'
			}`}
		>
			<div
				className={`w-5 h-5 rounded-full absolute transform duration-200 ease-out bg-white left-0.5 ${
					isDarkTheme ? 'translate-x-5' : 'translate-x-0'
				}`}
			/>
			{isDarkTheme ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-4 w-4 text-white'
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
				</svg>
			) : (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-4 w-4 text-white'
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<path
						fillRule='evenodd'
						d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
						clipRule='evenodd'
					/>
				</svg>
			)}
		</div>
		</>
    <%}%>
  )
}
