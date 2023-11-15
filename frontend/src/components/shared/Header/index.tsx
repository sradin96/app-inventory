import { BiMenuAltLeft } from 'react-icons/bi';
import { CiUser } from 'react-icons/ci';
import { FiMail, FiPhone, FiSun } from "react-icons/fi";
import { HiChevronDown } from 'react-icons/hi'
import { FaRegMoon, FaHeart } from 'react-icons/fa'
import { PiShoppingCartSimple } from 'react-icons/pi';
import { Link, NavLink } from "react-router-dom";
import Search from "../../containers/Search";
import "./styles.scss";
import { useContext, useState } from 'react';
import { AuthContext } from '../../../store/auth-context';
import { ThemeContext } from '../../../store/theme-context';
import { CartContext } from '../../../store/cart-context';

const Header = () => {
	const { user, userId, handleLogout, userIsAdmin } = useContext(AuthContext);
	const [isOpen, setIsOpen] = useState(false);
	const { theme, toggleTheme } = useContext(ThemeContext)
	const { cartItems } = useContext(CartContext)

	const handleUserDropdown = () => {
		setIsOpen(!isOpen);
	}

	const handleTheme = () => {
		toggleTheme()
	}

	const handleLogoutClick = () => {
		setIsOpen(!isOpen)
		handleLogout()
	}

  return (
    <header className="header">
			<div className="header__top">
				<div className="wrap">
					<div className="header__top-container">
						<Link className="header__top-link" to="tel:0123456789">
							<FiPhone />
							Pozovite nas
						</Link>
						<Link className="header__top-link" to="mailto:prodaja@shop.com">
							<FiMail />
							prodaja@shop.com
						</Link>
						<div className="header__top-holder">
							{
								userId && <NavLink className='header__favourites' to={`/favourites/${userId}`}>
									<FaHeart />
									Favourites
									</NavLink>
							}
							<button className={`header__theme-btn${theme  === 'light' ? '' : ' header__theme-btn--dark'}`} onClick={handleTheme}>
								<span className='header__theme-toggle'>
									{
										theme === 'light' ? <FiSun />
										: <FaRegMoon />
									}
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="header__bottom">
				<div className="wrap">
					<div className="header__bottom-container">
						<NavLink to="/" className="header__logo">
							Store
						</NavLink>
						<Search />
						{ !user ? <NavLink className="header__bottom-link" to="/korisnik">
							<CiUser />
							Prijava
						</NavLink>
						: <div className='header__user-holder'>
								<button type='button' className='header__user' onClick={handleUserDropdown}>
									<CiUser />
									{user}
									<HiChevronDown className='header__user-chevron' />
								</button>
								{
									isOpen &&
									<div className="header__user-dropdown">
										<ul className="header__user-list">
											<li className="header__user-item">
												<NavLink className='header__user-link' to='/podesavanja' onClick={handleUserDropdown}>Settings</NavLink>
											</li>
											{
												userIsAdmin &&
												<li className="header__user-item">
													<NavLink className='header__user-link' to='/admin-stranica' onClick={handleUserDropdown}>Admin Page</NavLink>
												</li>
											}
											<li className="header__user-item">
												<button className='header__logout' type='button' onClick={handleLogoutClick}>Logout</button>
											</li>
										</ul>
									</div>
								}
						</div>
					}
						<NavLink className="header__bottom-link header__cart-link" to="/korpa">
							{
								cartItems.length > 0 && <span className='header__cart-result'>{cartItems.length}</span>
							}
							<PiShoppingCartSimple />
							Korpa
						</NavLink>
					</div>
				</div>
			</div>
			<div className="header__navigation">
				<div className="wrap">
					<button className="header__menu" type="button">
						<BiMenuAltLeft />
						Proizvodi
					</button>
				</div>
			</div>
    </header>
  );
};

export default Header;
