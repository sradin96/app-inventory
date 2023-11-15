import { useContext } from "react";
import { FavouritesContext } from "../../../store/favourites-context";
import Item from "../../containers/Item";
import "./styles.scss";
import { Link } from "react-router-dom";

const FavouritesPage = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <div className="favourites-page">
      <div className="wrap">
        <div className="favourites-page__container">
          {favourites.length ? (
            <>
							<h1 className="favourites-page__title title">Omiljeni proizvodi</h1>
							<div className="favourites-page__holder">
								{favourites.map((fav) => {
									return <Item key={fav.id} item={fav} />;
								})}
							</div>
            </>
          ) : (
            <div className="">
              <h1 className="favourites-page__title title">Nema omiljenih proizvoda</h1>
							<Link to='/' className="favourites-page__link">Vratite se na pocetnu stranu!</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
