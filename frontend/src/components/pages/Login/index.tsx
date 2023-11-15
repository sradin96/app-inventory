import { useContext, useState } from "react";
import Form from "../../containers/Form"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/auth-context";
import { useCookies } from "react-cookie";

const Login = () => {
	const { setUser, setUserExist, setIsAuth } = useContext(AuthContext);
	const [cookies] = useCookies(['role', 'token', 'user']);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
    password: '',
    email: '',
		username: '',
  });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

	const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: formData.email,
        password: formData.password,
      }, {
				withCredentials: true
			});

      const userName = response.data.userData.username

			setUser(userName)
			setUserExist(true)
			setIsAuth(true)
			navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

	return (
			<div className="content-holder">
				<div className="wrap">
				<Form isLogin={true} buttonValue='Prijavite se' password={formData.password} email={formData.email} handleSubmit={handleSubmit} handleChange={handleChange} />
				</div>
			</div>
	)
}

export default Login
