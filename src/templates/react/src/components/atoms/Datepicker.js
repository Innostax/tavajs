import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Datepicker = () => {
	const [startDate, setStartDate] = useState(new Date())
	return (
		<span>
			Enter Date
			<DatePicker
				selected={startDate}
				onChange={(date) => {
					setStartDate(date)
				}}
			/>
		</span>
	)
}

export default Datepicker
