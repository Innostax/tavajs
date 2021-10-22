import React, { useState } from 'react'

const Checkbox = ({ label, value, name }) => {
	const [isChecked, setIsChecked] = useState(false)

	return (
		<>
			<input
				type='checkbox'
				name={name}
				checked={isChecked}
				value={value}
				onChange={() => {
					setIsChecked(!isChecked)
				}}
			/>
			{label}
		</>
	)
}

export default Checkbox
