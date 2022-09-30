import { useState } from 'react'
const Checkbox = ({ label, value, name }) => {
	const [isChecked, setIsChecked] = useState(false)
	return (
		<div className='flex items-center mb-4'>
			<input
				id='default-checkbox'
				type='checkbox'
				value={value}
				onClick={() => setIsChecked(!isChecked)}
				className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
				checked={isChecked}
				name={name}/>
			<label
				htmlFor='default-checkbox'
				className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
				{label}
			</label>
		</div>
	)
}

export default Checkbox
