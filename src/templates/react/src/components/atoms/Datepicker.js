import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Datepicker = ({ date, setDate }) => {
	return (
		<span>
			Enter Date
			<DatePicker selected={date} onChange={setDate} />
		</span>
	)
}

export default Datepicker
