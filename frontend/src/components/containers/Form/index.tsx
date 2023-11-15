import { Link } from 'react-router-dom'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Button from '../Button'
import './styles.scss'

type FormProps = {
	handleSubmit: (e: React.FormEvent) => void,
	password: string,
	email: string,
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	buttonValue: string,
	isLogin?: boolean
}

const Form = ({ handleSubmit, password, email, handleChange, buttonValue, isLogin }: FormProps) => {
	return (
		<form className='form' onSubmit={handleSubmit}>
			<div className="form__input-holder">
				<h2 className="form__title">
					{
						isLogin ? "Vaš Store nalog"
						: "Kreirajte Store nalog"
					}
				</h2>
				{
					isLogin ? <span className='form__subtitle'>
						Nemate Store nalog? {<Link className='form__subtitle-link' to='/registracija'>Registrujte se brzo i lako.</Link>}
					</span>
					: <span className='form__subtitle'>
						Već imate Store nalog? {<Link className='form__subtitle-link' to='/korisnik'>Prijavite se.</Link>}
					</span>
				}
			</div>
			{ !isLogin &&
				<div className="form__input-holder">
					<label htmlFor={email} className="form__label">Username:</label>
					<input required className='form__input' type='text' name='username' onChange={handleChange} placeholder='Unesite vaše ime i prezime' />
				</div>
			}
			<div className="form__input-holder">
				<label htmlFor={email} className="form__label">Email:</label>
				<input required className='form__input' type='email' name='email' onChange={handleChange} placeholder='Unesite vašu e-mail adresu' />
			</div>
			<div className="form__input-holder">
				<label htmlFor={password} className="form__label">Password:</label>
				<input required className='form__input' type='password' name='password' onChange={handleChange} placeholder='Unesite vašu lozinku' />
			</div>
			{
				!isLogin &&
				<div className="form__checkbox-holder">
					<input required type="checkbox" className='form__checkbox' name="agreement" id="agreement" />
					<label htmlFor="agreement" className="form__checkbox-label">Prihvatam <Link className='form__checkbox-link' to='/'>Uslove korišćenja.</Link></label>
				</div>
			}
			<Button type="submit" value={buttonValue} />
			<div className="form__bottom-holder">
				<div className="form__bottom-icon">
					<AiOutlineInfoCircle />
				</div>
				<p className="form__text">Kupovinom kao registrovani kupac ostvarujete pravo na Store bodove koji vam donose i do 50% popusta pri sledećoj kupovini.</p>
			</div>
		</form>
	)
}

export default Form
