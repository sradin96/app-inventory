import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { ItemType } from "../types/types";
import axios from "axios";

type ItemsContextProps = {
  items: ItemType[];
  setItems: Dispatch<SetStateAction<ItemType[]>>;
}

export const ItemsContext = createContext<ItemsContextProps>({
  items: [],
  setItems: () => {},
});

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ItemType[]>([]);

	const fetchItems = async () => {
		try {
			const response = await axios.get('http://localhost:3001/items');
			setItems(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchItems();
	}, []);

  const values = useMemo(() => {
    return { items, setItems };
  }, [items]);

  return <ItemsContext.Provider value={values}>{children}</ItemsContext.Provider>;
};
