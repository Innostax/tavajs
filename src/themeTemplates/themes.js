import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import React, { useState, useEffect } from 'react'

const DARK_CLASS = 'dark'

export const DarkToggle = () => {
	const [isDark, setIsDark] = useState(false)
	useEffect(() => {
		if (localStorage.getItem('theme') === DARK_CLASS) {
			document.documentElement.classList.add(DARK_CLASS)
			setIsDark(true)
		} else {
			document.documentElement.classList.remove(DARK_CLASS)
			setIsDark(false)
		}
	}, [])

	const handleChange = (isChecked) => {
		if (isChecked) {
			document.documentElement.classList.add(DARK_CLASS)
			localStorage.setItem('theme', 'dark')
			setIsDark(true)
		} else {
			document.documentElement.classList.remove(DARK_CLASS)
			localStorage.setItem('theme', 'light')
			setIsDark(false)
		}
	}
	return (
		<BootstrapSwitchButton
			className='DarkToggle'
			checked={isDark}
			width={50}
			onlabel='🌙'
			offlabel='🔆'
			onstyle='secondary'
			onChange={(event) => handleChange(event)}
			aria-label='Dark mode'
		/>
	)
}
