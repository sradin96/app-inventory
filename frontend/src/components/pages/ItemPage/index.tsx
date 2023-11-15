import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemType } from "../../../types/types";

const ItemPage = () => {
	const { id } = useParams();

  const [item, setItem] = useState<ItemType | null>(null);

	useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/item/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);
	return (
		<div className='item-page'>
			{item?.name}
		</div>
	)
}

export default ItemPage
