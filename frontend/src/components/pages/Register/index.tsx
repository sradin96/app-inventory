import { useState } from "react";
import Form from "../../containers/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
    password: '',
    email: '',
		username: '',
  });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
		if (name === 'username') {
			if(!/^[a-zA-Z0-9]+$/.test(value)){
				e.preventDefault();
				return;
			 }
		}
    setFormData({ ...formData, [name]: value });
  };

	const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/register', {
				username: formData.username,
        email: formData.email,
        password: formData.password,
      }, {
				withCredentials: true
			});

			navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

	return (
		<div className="content-holder">
			<div className="wrap">
					<Form buttonValue='Registrujte se' password={formData.password} email={formData.email} handleSubmit={handleSubmit} handleChange={handleChange} />
			</div>
		</div>
	)
}

export default Register