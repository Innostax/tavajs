const Button = ({ variant, name, color, onClick, align }) => {
	return (
		<button
			type='button'
			className={`${color} ${align} font-medium ${variant} text-sm px-5 py-2.5 mr-2 mb-2 `}
			onClick={() => onClick()}
		>
			{name}
		</button>
	)
}

export default Button
