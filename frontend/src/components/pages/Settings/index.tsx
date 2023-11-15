import { FormEvent, useContext, useState } from "react";
import InputField from "../../ui/InputField";
import { AuthContext } from "../../../store/auth-context";
import axios from "axios";

const Settings = () => {
	const { userId } = useContext(AuthContext)

	const inputs = [
		{ type: "text", label: "Ime:", for: "username" },
		{ type: "text", label: "Email:", for: "email" },
		{ type: "password", label: "Šifra:", for: "password" },
		{ type: "password", label: "Ponovo unesite šifru:", for: "repassword" },
		{ type: "text", label: "Telefon:", for: "phone" },
		{ type: "text", label: "Adresa:", for: "address" },
		{ type: "text", label: "Grad:", for: "city" },
		{ type: "number", label: "Poštanski broj", for: "zipcode" },
	];

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
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
			await axios.put(`http://localhost:3001/user-update/${userId}`, formData);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="address-form">
			<div className="wrap">
				<h4 className="address-form__title">Izmenite podatke</h4>
				<form action={`/user-update/${userId}`} method="put" className="address-form__form" onSubmit={handleUpdateUser}>
					{inputs.map((input) => {
						return (
							<InputField key={input.for} input={input} handleChange={handleChange} />
						);
					})}
					<button className="btn address-form__btn" type="submit">Sačuvajte promene</button>
				</form>
			</div>
		</div>
	)
}

export default Settings
