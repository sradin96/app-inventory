import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ItemType } from "../../../types/types";
import Item from "../../containers/Item";
import './styles.scss'

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const page = searchParams.get("page");

  const initialPage = typeof page === 'string' ? parseInt(page, 10) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [items, setItems] = useState<ItemType[] | null>(null);
  const [numberOfItems, setNumberOfItems] = useState<number | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/items/search?name=${name}&page=${currentPage}`);
        setItems(response.data.items);
				setNumberOfItems(response.data.totalItems)
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [name, currentPage]);

  return (
    <div className='search-page'>
      <div className="wrap">
				<div className="search-page__top">
					<div className="search-page__top-content">
						<h1 className="search-page__title">Rezultati pretrage za <span className="search-page__title-name">"{name}"</span></h1>
						<span className="search-page__result-number">Broj proizvoda: {numberOfItems}</span>
					</div>
					<div className="search-page__filter">
						<span className="search-page__filter-text">Sortitaj po:</span>
						<select className="search-page__filter-select">
							<option value="Sortitaj">Pojmu pretrage</option>
							<option value="Ceni Rastuće">Ceni Rastuće</option>
							<option value="Ceni Opadajuće">Ceni Opadajuće</option>
							<option value="Nazivi A - Z">Nazivi A - Z</option>
						</select>
					</div>
				</div>
				<div className="search-page__container">
					{items?.map((item) => (
						<Item key={item.id} item={item} />
					))}
				</div>
			</div>
    </div>
  );
};

export default SearchPage;
