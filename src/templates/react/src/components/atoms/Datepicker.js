import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Datepicker = (handleStartDate) => {
	const handleStartDate = (date) => {
		setStartDate(date)
	}
	const [startDate, setStartDate] = useState(new Date())
	return (
		<span>
			Enter Date
			<DatePicker
				selected={startDate}
				onChange={handleStartDate}
			/>
		</span>
	)
}

export default Datepicker
