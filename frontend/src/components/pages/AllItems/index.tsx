import { useContext } from "react";
import { ItemsContext } from "../../../store/items-context";
import Item from "../../containers/Item";
import './styles.scss'

const AllItems = () => {
  const { items } = useContext(ItemsContext);

  return (
    <div className="all-items">
			<h1 className="title all-items__title">Svi Proizvodi</h1>
      {
				items.map(item => {
					return <Item key={item.id} item={item} />
				})
			}
    </div>
  );
};

export default AllItems;
