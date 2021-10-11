import { Button as BSButton } from 'react-bootstrap'

const Button = ({ name, color, func, size }) => {
	return (
		<BSButton variant={color} onClick={func} size={size}>
			{name}
		</BSButton>
	)
}

export default Button
