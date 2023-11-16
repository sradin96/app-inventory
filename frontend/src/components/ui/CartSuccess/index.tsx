import { Link } from "react-router-dom"
import './styles.scss'

const CartSuccess = () => {
	return (
		<div className="cart-success">
			<h4 className="cart-success__title">Vaša porudžbina je primljena.</h4>
			<p className="cart-success__text">Poslat Vam je mail sa računom!</p>
			<Link className="cart-success__link" to='/'>Vratite se na početnu stranicu</Link>
		</div>
	)
}

export default CartSuccess
