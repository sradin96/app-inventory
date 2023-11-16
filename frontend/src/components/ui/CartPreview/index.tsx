import { CartItemType, User } from '../../../types/types'
import CartItem from '../../containers/CartItem'
import Address from '../Address'
import './styles.scss'

type CartPreviewProps = {
  cartItems: CartItemType[],
  currentUser?: User
}

const CartPreview = ({ cartItems, currentUser}: CartPreviewProps) => {
  return (
    <div className='cart-preview'>
      <div className="cart-preview__holder">
        <ul className="cart-previeew__list">
          {
            cartItems.map((item) => (
              <CartItem item={item.item} key={item.item.id} />
            ))
          }
        </ul>
      </div>
      <div className="cart-preview__address">
          <Address />
      </div>
    </div>
  )
}

export default CartPreview
