import { FormEvent, useState, useContext } from 'react';
import './styles.scss'
import InputField from '../../ui/InputField';
import { AuthContext } from '../../../store/auth-context';
import { useCookies } from "react-cookie";
import axios from 'axios';

const AddressForm = () => {
	const { userId, setCurrentUser } = useContext(AuthContext)
	const [cookies, setCookies] = useCookies(['user'])

	const inputs = [
		{ type: "text", label: "Ime:", for: "username" },
		{ type: "text", label: "Email:", for: "email" },
		{ type: "text", label: "Telefon:", for: "phone" },
		{ type: "number", label: "Adresa dostave:", for: "address" },
		{ type: "number", label: "Grad:", for: "city" },
		{ type: "number", label: "Poštanski broj", for: "zipcode" },
	];

	const [formData, setFormData] = useState({
		username: '',
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

	const handleUpdateUser = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.put(`http://localhost:3001/user-update/${userId}`, formData);
			setCurrentUser(response.data)
			if (formData.username === response.data.username) {
				setCookies('user', response.data.username);
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="address-form">
			<h4 className="address-form__title">Upišite novu adresu isporuke</h4>
			<form action={`/user-update/${userId}`} method="post" className="address-form__form" onSubmit={handleUpdateUser}>
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
