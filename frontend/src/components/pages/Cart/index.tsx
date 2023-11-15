import { useContext, useState } from "react"
import { CartContext } from "../../../store/cart-context"
import CartItem from "../../containers/CartItem"
import './styles.scss'
import { Link } from "react-router-dom"
import { AuthContext } from "../../../store/auth-context"
import AddressForm from "../../containers/AddressForm"

const Cart = () => {
	const { cartItems } = useContext(CartContext)
	const { user } = useContext(AuthContext);
	const [cartStep, setCartStep] = useState(0);

	const totalPrice = cartItems.reduce((acc, item) => {
    const itemPrice = item.item.price || 0;

    const totalItemPrice = itemPrice * item.quantity;

    return acc + totalItemPrice;
  }, 0);

	let content;

	if (cartStep === 0) {
		content = (
			<div className="cart-page__cart-holder">
				{cartItems.length > 0 ? (
					cartItems.map((item) => <CartItem item={item.item} key={item.item.id} />)
				) : (
					<p>Prazna Korpa</p>
				)}
			</div>
		);
	} else if (cartStep === 1) {
		content = <AddressForm />;
	} else if (cartStep === 2) {
		content = <div>text2</div>;
	} else {
		content = <div>text3</div>;
	}

	const handleCart = () => {
		setCartStep(cartStep + 1)
	}

	return (
		<div className="cart-page">
			<div className="wrap">
				<h1 className="cart-page__title title">Vaša korpa</h1>
				<div className="cart-page__container">
					<div className="cart-page__left">
						{content}
					</div>
					<div className="cart-page__results">
						<h4 className="cart-page__results-title">Pregled narudžbine</h4>
						<div className="cart-page__price-holder">
							<span className="cart-page__price-text">Cena za plaćanje:</span>
							<span className="cart-page__price">{totalPrice.toLocaleString('rs').replaceAll(',', '.')},00 RSD</span>
						</div>
						<div className="cart-page__price-holder">
							<span className="cart-page__price-text">Popust:</span>
							<span className="cart-page__price">0,00 RSD</span>
						</div>
						<div className="cart-page__total-holder">
							<span className="cart-page__total-text">Iznos kupovine:</span>
							<span className="cart-page__total">{totalPrice.toLocaleString('rs').replaceAll(',', '.')},00 RSD</span>
						</div>
						{
							!user &&
							<div className="cart-page__results-content">
								<Link to='/korisnik' className="cart-page__results-link">Napravite novi nalog ili se ulogujte</Link>
								<span className="cart-page__results-content-text">na postojeći radi jednostavnije kupovine.</span>
							</div>
						}
						<button className="cart-page__btn btn" type="button" onClick={handleCart}>Nastavite</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart