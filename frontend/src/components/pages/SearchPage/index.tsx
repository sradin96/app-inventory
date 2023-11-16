import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ItemType } from "../../../types/types";
import Item from "../../containers/Item";
import './styles.scss';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");

  const initialPage = typeof page === 'string' ? parseInt(page, 10) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [items, setItems] = useState<ItemType[] | null>(null);
  const [numberOfItems, setNumberOfItems] = useState<number | null>(null);

  const [selectedSort, setSelectedSort] = useState<string>(sort ?? '');

  useEffect(() => {
    // Check the URL for the 'sort' parameter and set it in the state
    const sortFromUrl = searchParams.get("sort");
    setSelectedSort(sortFromUrl || '');
  }, [searchParams]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    // Get the existing parameters from the URL
    const params = new URLSearchParams(window.location.search);

    // Update the 'sort' parameter
    params.set('sort', selectedValue);

    // Update the URL without removing other parameters
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

    // Update the state
    setSelectedSort(selectedValue);

    // Fetch items with the updated sort option
    fetchItems(selectedValue);
  }

  const fetchItems = async (sortOption: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/items/search?name=${name}&page=${currentPage}&sort=${sortOption}`);
      setItems(response.data.items);
      setNumberOfItems(response.data.totalItems);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  useEffect(() => {
    fetchItems(selectedSort);
  }, [name, currentPage, selectedSort]);

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
            <select className="search-page__filter-select" value={selectedSort} onChange={handleSelectChange}>
              <option value="">Pojmu pretrage</option>
              <option value="lowToHigh">Ceni Rastuće</option>
              <option value="highToLow">Ceni Opadajuće</option>
              <option value="nameAtoZ">Nazivi A - Z</option>
              {/* Add more options as needed */}
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
