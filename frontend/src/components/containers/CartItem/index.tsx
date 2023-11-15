import { useContext, useEffect, useState } from "react"
import { ItemType } from "../../../types/types"
import { IoMdClose } from "react-icons/io";
import { CartContext } from "../../../store/cart-context";
import { FaPlus, FaMinus } from "react-icons/fa6";
import './styles.scss'

type ItemTypeProps = {
	item: ItemType
}

const CartItem = ({ item }: ItemTypeProps) => {
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const { addToCart, cartItems, increaseQuantity, decreaseQuantity } = useContext(CartContext)

	useEffect(() => {
    if (item?.image && Array.isArray(item.image)) {
      const urls: string[] = [];

      item.image.forEach((img: any) => {
        const uint8Array = new Uint8Array(img.data);

        const fileExtension = item.name ? item.name.split(".").pop() : "png";

        let mimeType;
        switch (fileExtension?.toLowerCase()) {
          case "jpg":
          case "jpeg":
            mimeType = "image/jpeg";
            break;
          case "png":
            mimeType = "image/png";
            break;
          default:
            mimeType = `image/${fileExtension?.toLowerCase()}`;
        }

        const imageBlob = new Blob([uint8Array], { type: mimeType });

        const url = URL.createObjectURL(imageBlob);

        urls.push(url);
      });

      setImageUrls(urls);
    }
  }, [item]);

	const cartItem = cartItems.find((cartItem) => cartItem.item.id === item.id);

  const quantity = cartItem ? cartItem.quantity : 1;

	const itemPrice = item.price * quantity;

	return (
		<div className="cart-item">
			<div className="cart-item__img-holder">
				<img src={imageUrls[1]} alt="" className="cart-item__img" />
			</div>
			<div className="cart-item__content">
				<h2 className="cart-item__name">{item.name}</h2>
				<h3 className="cart-item__brand">{item.brand}</h3>
			</div>
			<div className="cart-item__count-holder">
				<button className="cart-item__count-btn" type="button" onClick={() => decreaseQuantity(item)} disabled={quantity === 1}>
					<FaMinus />
				</button>
				{quantity}
				<button className="cart-item__count-btn" type="button" onClick={() => increaseQuantity(item)}>
					<FaPlus />
				</button>
			</div>
			<span className="cart-item__price">{itemPrice.toLocaleString('rs').replaceAll(',', '.')},00 RSD</span>
			<button className="cart-item__btn" type="button" onClick={() => addToCart(item)}>
				<IoMdClose />
			</button>
		</div>
	)
}

export default CartItem
