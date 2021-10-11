import Label from '../atoms/Label'
import Input from '../atoms/Input'

const InputGroup = ({ title }) => {
	return (
		<>
			<Label title={title} />
			<Input />
		</>
	)
}

export default InputGroup
