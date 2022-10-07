import Label from '../atoms/Label'
import Input from '../atoms/Input'

function InputGroup({ title, placeholder, type, onChange, id, value, name }) {
	return (
		<>
			<Label title={title} />
			<Input
				placeholder={placeholder}
				type={type}
				onChange={onChange}
				id={id}
				value={value}
				name={name}
			/>
		</>
	)
}

export default InputGroup
