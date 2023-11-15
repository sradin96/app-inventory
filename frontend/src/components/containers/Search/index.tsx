import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { GrSearch } from 'react-icons/gr'
import { FormEvent, useState } from "react";

const Search = () => {
	const [searchValue, setSearchValue] = useState('')
	const navigate = useNavigate()

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();

		navigate(`/items/search?name=${searchValue}`)
	}

	return (
		<form onSubmit={handleSearch} className="search">
			<input className="search__input" placeholder="Unesite pojam za pretragu" onChange={(e) => setSearchValue(e.target.value)} />
			<button type="submit" className="search__btn"><GrSearch /></button>
		</form>
	)
}

export default Search
