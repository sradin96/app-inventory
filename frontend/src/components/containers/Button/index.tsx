type ButtonProps = {
	type: "button" | "submit" | "reset" | undefined,
	value: string,
	isDisabled?: boolean,
	onClick?: () => void
}

const Button = ({ type, value, isDisabled, onClick }: ButtonProps) => {
	return (
		<button type={type} className="btn" disabled={isDisabled} onClick={onClick}>
			{value}
		</button>
	)
}

export default Button
