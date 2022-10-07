import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { TextField } from '@mui/material'

function Datepicker({ date, setDate }) {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<DatePicker
				value={date}
				onChange={(newValue) => setDate(newValue)}
				renderInput={(params) => <TextField {...params} />}
				label='Date'
			/>
		</LocalizationProvider>
	)
}
export default Datepicker
