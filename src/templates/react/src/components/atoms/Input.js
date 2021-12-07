import { Form } from 'react-bootstrap'

const Input = ({ placeholder, type, onChange, id, value, name }) => (
	<Form.Control
		placeholder={placeholder}
		type={type}
		id={id}
		onChange={onChange}
		value={value}
		name={name}
	/>
)

export default Input
