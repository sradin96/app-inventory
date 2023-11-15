import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ItemType } from "../types/types";
import axios from "axios";
import { AuthContext } from "./auth-context";
import { useNavigate } from "react-router-dom";

type FavouritesContextProps = {
  favourites: ItemType[];
  setFavourites: Dispatch<SetStateAction<ItemType[]>>;
	addToFavourite: (itemId: number) => void
}

export const FavouritesContext = createContext<FavouritesContextProps>({
  favourites: [],
  setFavourites: () => {},
	addToFavourite: () => {}
});

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<ItemType[]>([]);
	const { userId } = useContext(AuthContext)
	const navigate = useNavigate()

  const fetchFavourites = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/favourite-items/${userId}`);
      setFavourites(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavourite = useCallback(async (itemId: number) => {
		if(!userId) {
			navigate('/korisnik')
			return;
		}
		try {
			const isItemInFavorites = favourites.some((favorite) => favorite.id === itemId);

			if (isItemInFavorites) {
				const updatedFavorites = favourites.filter((favorite) => favorite.id !== itemId);
				setFavourites(updatedFavorites);

				await axios.post(`http://localhost:3001/add-to-favourite`, {
					userId,
					itemId,
				});
			} else {
				await axios.post(`http://localhost:3001/add-to-favourite`, {
					userId,
					itemId,
				});
				await fetchFavourites();
			}
		} catch (error) {
			console.log(error);
		}
	}, [favourites, userId, fetchFavourites]);

  useEffect(() => {
    fetchFavourites();
  }, [userId]);

  const values = useMemo(() => {
    return { favourites, setFavourites, addToFavourite };
  }, [favourites]);

  return <FavouritesContext.Provider value={values}>{children}</FavouritesContext.Provider>;
};
