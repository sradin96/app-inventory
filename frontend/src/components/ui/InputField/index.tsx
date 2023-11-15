import './styles.scss'

const InputField = ({ input, handleChange }: any) => {
	return (
		<div key={input.for} className={input.type === 'file' ? "input-field__input-holder input-field__input-holder--file" : "input-field__input-holder"}>
			<label htmlFor={input.for} className="input-field__label">
				{input.label}
			</label>
			<input
				onChange={handleChange}
				type={input.type}
				name={input.for}
				id={input.for}
				className="input-field__input"
				multiple={input.for === 'image'}
			/>
	</div>
	)
}

export default InputField
