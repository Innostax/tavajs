import TextField from '@mui/material/TextField'

function InputForm({ placeholder, type, onChange, id, value, name, title }) {
	return (
		<TextField
			variant='outlined'
			label={title}
			id={id}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	)
}
export default InputForm
