const Select = ({ label, name, value }) => {
	return (
		<>
			<label htmlFor='cars'>{label}</label>

			<select name={name} id={name}>
				<option value={value}>{value}</option>
			</select>
		</>
	)
}

export default Select
