import { useContext, useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { AuthContext } from "../../../store/auth-context";
import { ItemType } from "../../../types/types";
import "./styles.scss";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../../../store/favourites-context";
import { CartContext } from "../../../store/cart-context";

type ItemProps = {
  item: ItemType;
};

const Item = ({ item }: ItemProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { addToFavourite } = useContext(FavouritesContext);
  const { role } = useContext(AuthContext);
  const { favourites } = useContext(FavouritesContext);
  const isFavourite = favourites.some((favourite) => favourite.id === item.id);

	const [isPopupVisible, setPopupVisible] = useState(false);
	const [popupMessage, setPopupMessage] = useState("");

	const { addToCart } = useContext(CartContext)

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

	const handleFavourite = () => {
		addToFavourite(item.id)
		setPopupVisible(true);
		if(isFavourite) {
			setPopupMessage("Izbrisan iz omiljenih");
		} else {
			setPopupMessage("Dodat u omiljene");
		}
		setTimeout(() => {
			setPopupVisible(false);
		}, 2000);
	}

  return (
    <div className="item">
      <div className="item__top">
        {role === "admin" && (
          <div className="item__controls">
            <button type="button" className="item__edit-btn item__btn">
              <FaEdit />
            </button>
            <button type="button" className="item__delete-btn item__btn">
              <FaTrash />
            </button>
          </div>
        )}
        <div className="item__favourites-holder">
					{isPopupVisible && <span className="item__favourites-text">{popupMessage}</span>}
          <button
            type="button"
            className="item__favourites-btn item__btn"
            onClick={handleFavourite}
          >
            {isFavourite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
      <Link to={`/item/${item.id}`}>
        <div className="item__img-holder">
          <img className="item__img" src={imageUrls[1]} alt="" />
        </div>
        <h2 className="item__name">{item.name}</h2>
      </Link>
      <div className="item__bottom">
        <div className="item__price-holder">
          <span className="item__price">{item.price.toLocaleString('rs').replaceAll(',', '.')},00</span>
          <span className="item__price-currency">RSD</span>
        </div>
        <button type="button" className="item__cart-btn" onClick={() => addToCart(item)}>
          <FaShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default Item;
