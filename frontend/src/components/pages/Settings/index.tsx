import { FormEvent, useContext, useState } from "react";
import InputField from "../../ui/InputField";
import { AuthContext } from "../../../store/auth-context";
import axios from "axios";
import { useCookies } from "react-cookie";
import './styles.scss'

const Settings = () => {
	const { userId, setCurrentUser, currentUser } = useContext(AuthContext)
	const [cookies, setCookies] = useCookies(['user'])

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
			const updatedFormData = { ...formData };
			if (!updatedFormData.password) {
				delete (updatedFormData as { password?: string }).password;
			}
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
		<div className="settings-page">
			<div className="wrap">
				<div className="settings-page__container">
					<div className="settings-page__form-holder">
						<h4 className="settings-page__title">Izmenite podatke</h4>
						<form action={`/user-update/${userId}`} method="put" className="settings-page__form" onSubmit={handleUpdateUser}>
							{inputs.map((input) => {
								return (
									<InputField key={input.for} input={input} handleChange={handleChange} />
								);
							})}
							<button className="btn settings-page__btn" type="submit">Sačuvajte promene</button>
						</form>
					</div>
					<div className="settings-page__content">
						<h4 className="settings-page__title">Trenutni podaci</h4>
						<div className="settings-page__content-holder">
							<span className="settings-page__content-text">Ime</span>
							<span className="settings-page__content-text settings-page__content-text--bold">{currentUser?.username}</span>
						</div>
						<div className="settings-page__content-holder">
							<span className="settings-page__content-text">Email</span>
							<span className="settings-page__content-text settings-page__content-text--bold">{currentUser?.email}</span>
						</div>
						<div className="settings-page__content-holder">
							<span className="settings-page__content-text">Telefon</span>
							<span className="settings-page__content-text settings-page__content-text--bold">{currentUser?.phone}</span>
						</div>
						<div className="settings-page__content-holder">
							<span className="settings-page__content-text">Adresa</span>
							<span className="settings-page__content-text settings-page__content-text--bold">{currentUser?.address}</span>
						</div>
						<div className="settings-page__content-holder">
							<span className="settings-page__content-text">Grad</span>
							<span className="settings-page__content-text settings-page__content-text--bold">{currentUser?.city}</span>
						</div>
						<div className="settings-page__content-holder">
							<span className="settings-page__content-text">Poštanski broj</span>
							<span className="settings-page__content-text settings-page__content-text--bold">{currentUser?.zipcode}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings
