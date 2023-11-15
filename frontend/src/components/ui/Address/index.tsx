import { useContext, useState } from 'react'
import { AuthContext } from '../../../store/auth-context'
import AddressForm from '../../containers/AddressForm'
import { FaAddressCard } from "react-icons/fa";
import './styles.scss'

const Address = () => {
    const { currentUser } = useContext(AuthContext)
    const [isVisible, setIsVisible] = useState(false);

    const handleFormVisibility = () => {
        setIsVisible(!isVisible);
    }

  return (
    <div className='address'>
        {
            currentUser?.address &&
            <div className="address__current">
                <ul className="address__current-content">
                    <li className='address__current-item'>
                        <span className='address__current-item-text'>Ime:</span>
                        <span className='address__current-item-text address__current-item-text--bold'>{currentUser.username}</span>
                    </li>
                    <li className='address__current-item'>
                        <span className='address__current-item-text'>Email:</span>
                        <span className='address__current-item-text address__current-item-text--bold'>{currentUser.email}</span>
                    </li>
                    <li className='address__current-item'>
                        <span className='address__current-item-text'>Telefon:</span>
                        <span className='address__current-item-text address__current-item-text--bold'>{currentUser.phone}</span>
                    </li>
                    <li className='address__current-item'>
                        <span className='address__current-item-text'>Adresa:</span>
                        <span className='address__current-item-text address__current-item-text--bold'>{currentUser.address}</span>
                    </li>
                    <li className='address__current-item'>
                        <span className='address__current-item-text'>Grad:</span>
                        <span className='address__current-item-text address__current-item-text--bold'>{currentUser.city}</span>
                    </li>
                    <li className='address__current-item'>
                        <span className='address__current-item-text'>Poštanski broj:</span>
                        <span className='address__current-item-text address__current-item-text--bold'>{currentUser.zipcode}</span>
                    </li>
                </ul>
                <button type='button' className="address__current-btn" onClick={handleFormVisibility}>
                    <FaAddressCard />
                    Forma
                </button>
            </div>
        }
        {
            isVisible && currentUser?.address &&
            <AddressForm />
        }
    </div>
  )
}

export default Address
