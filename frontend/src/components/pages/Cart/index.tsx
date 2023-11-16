import { useContext, useState } from "react";
import { CartContext } from "../../../store/cart-context";
import CartItem from "../../containers/CartItem";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../store/auth-context";
import Address from "../../ui/Address";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import "./styles.scss";
import axios from "axios";
import CartSuccess from "../../ui/CartSuccess";
import CartPreview from "../../ui/CartPreview";

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const { user, currentUser } = useContext(AuthContext);
  const [cartStep, setCartStep] = useState(0);
  const stepCount = [
    { number: 0, text: "Korpa" },
    { number: 1, text: "Adresa pošiljke" },
    { number: 2, text: "Pregled korpe" },
    { number: 3, text: "Uspešna porudžbina" },
  ];

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
          cartItems.map((item) => (
            <CartItem item={item.item} key={item.item.id} />
          ))
        ) : (
          <p>Prazna Korpa</p>
        )}
      </div>
    );
  } else if (cartStep === 1) {
    content = <Address />;
  } else if (cartStep === 2) {
    content = <CartPreview cartItems={cartItems} currentUser={currentUser} />
  } else {
    content = <CartSuccess />;
  }

	const handleSendEmail = async () => {
    try {
			const cartItemsText = cartItems.map(item => `${item.item.name} - Quantity: ${item.quantity}`).join('\n');
			const totalPriceText = `Total Price: ${totalPrice.toLocaleString("rs").replaceAll(",", ".")},00 RSD`;

	    const message = `${cartItemsText}\n\n${totalPriceText}`;
      await axios.post('http://localhost:3001/send-email', { to: currentUser?.email, subject: 'Poručeni proizvodi', message: message });
      setCartStep(3)
    } catch (error) {
      console.error(error);
      alert('Error sending email');
    }
  };

  const handleNextStep = () => {
    setCartStep((prevStep) => prevStep + 1);
		if(cartStep === 2) {
			handleSendEmail()
		}
  };

	const handlePrevStep = () => {
		if(cartStep === 0) return;
		setCartStep((prevStep) => prevStep - 1);
	}

  return (
    <div className="cart-page">
      <div className="wrap">
        <div className="cart-page__top">
					{
						cartStep !== 0 &&
						<button type="button" className="cart-page__back" onClick={handlePrevStep}>
							<FaChevronLeft />
							Nazad
						</button>
					}
          <h1 className="cart-page__title title">Vaša korpa</h1>
          <ul className="cart-page__steps">
            {stepCount.map((step) => {
              const isActive =
                step.number <= cartStep ||
                (step.number === cartStep - 1 && cartStep > 0);

              return (
                <li
                  key={step.number}
                  className={`cart-page__step${
                    isActive ? " cart-page__step--active" : ""
                  }`}
                >
                  <span className="cart-page__step-number">{step.number}</span>
                  <span className="cart-page__step-text">{step.text}</span>
                  {step.number < stepCount.length - 1 && <FaArrowRightLong />}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="cart-page__container">
          <div className="cart-page__left">{content}</div>
          <div className="cart-page__results">
            <h4 className="cart-page__results-title">Pregled narudžbine</h4>
            <div className="cart-page__price-holder">
              <span className="cart-page__price-text">Cena za plaćanje:</span>
              <span className="cart-page__price">
                {totalPrice.toLocaleString("rs").replaceAll(",", ".")},00 RSD
              </span>
            </div>
            <div className="cart-page__price-holder">
              <span className="cart-page__price-text">Popust:</span>
              <span className="cart-page__price">0,00 RSD</span>
            </div>
            <div className="cart-page__total-holder">
              <span className="cart-page__total-text">Iznos kupovine:</span>
              <span className="cart-page__total">
                {totalPrice.toLocaleString("rs").replaceAll(",", ".")},00 RSD
              </span>
            </div>
            {!user && (
              <div className="cart-page__results-content">
                <Link to="/korisnik" className="cart-page__results-link">
                  Napravite novi nalog ili se ulogujte
                </Link>
                <span className="cart-page__results-content-text">
                  na postojeći radi jednostavnije kupovine.
                </span>
              </div>
            )}
            <button
              className="cart-page__btn btn"
              type="button"
              onClick={handleNextStep}
							disabled={cartItems.length === 0 || (cartStep === 1 && currentUser?.address?.length !== undefined && currentUser.address.length === 0)}
            >
							{
								cartStep !== 2 ?
              	"Nastavite"
								: "Poručite robu"
							}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
