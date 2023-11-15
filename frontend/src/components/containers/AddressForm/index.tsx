import { FormEvent, useState } from 'react';
import './styles.scss'
import InputField from '../../ui/InputField';

const AddressForm = () => {
	const inputs = [
		{ type: "text", label: "Ime:", for: "name" },
		{ type: "text", label: "Email:", for: "email" },
		{ type: "text", label: "Telefon:", for: "phone" },
		{ type: "number", label: "Adresa dostave:", for: "address" },
		{ type: "number", label: "Grad:", for: "city" },
		{ type: "number", label: "Poštanski broj", for: "zipcode" },
	];

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		zipcode: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type } = e.target;

		if (type === "file") {
			const files = e.target.files;

			if (files) {
				const fileArray = Array.from(files);
				setFormData((prevData) => ({
					...prevData,
					[name]: fileArray,
				}));
			}
		} else {
			const { value } = e.target;
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handleCreateAddress = (e: FormEvent) => {
		e.preventDefault();
		console.log(formData);
	}

	return (
		<div className="address-form">
			<h4 className="address-form__title">Upišite novu adresu isporuke</h4>
			<form action="/item" method="post" className="address-form__form" onSubmit={handleCreateAddress}>
				{inputs.map((input) => {
					return (
						<InputField key={input.for} input={input} handleChange={handleChange} />
					);
				})}
				<button className="btn address-form__btn" type="submit">Sačuvajte adresu</button>
			</form>
		</div>
	)
}

export default AddressForm