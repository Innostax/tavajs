import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const DARK_CLASS = 'dark'

export const DarkToggle = () => {
	const systemPrefersDark = useMediaQuery(
		{
			query: '(prefers-color-scheme: dark)',
		},
		undefined,
		(prefersDark) => {
			setIsDark(prefersDark)
		}
	)

	const [isDark, setIsDark] = useState(systemPrefersDark)

	const handleChange = (event) => {
		if (event) {
			setIsDark(document.documentElement.classList.add(DARK_CLASS))
		} else {
			setIsDark(document.documentElement.classList.remove(DARK_CLASS))
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
