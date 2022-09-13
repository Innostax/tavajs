import ButtonMUI from '@mui/material/Button'

const Button = ({ variant, name, color, onClick, size }) => {
	return (
		<ButtonMUI variant={variant} onClick={onClick} color={color} size={size}>
			{name}
		</ButtonMUI>
	)
}

export default Button
