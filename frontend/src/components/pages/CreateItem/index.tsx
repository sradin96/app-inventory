import axios from "axios";
import "./styles.scss";
import { useContext, useState } from "react";
import { ItemsContext } from "../../../store/items-context";

const CreateItem = () => {
	const { items, setItems } = useContext(ItemsContext);
  const inputs = [
		{ type: "text", label: "Ime:", for: "name" },
		{ type: "text", label: "Brand:", for: "brand" },
		{ type: "text", label: "Opis:", for: "description" },
		{ type: "number", label: "Količina:", for: "quantity" },
		{ type: "number", label: "Cena:", for: "price" },
		{ type: "number", label: "Cena na popustu:", for: "discount" },
		{ type: "file", label: "Slika:", for: "image" },
	];

	const [formData, setFormData] = useState({
		name: '',
		brand: '',
		description: '',
		quantity: 0,
		price: 0,
		discount: 0,
		image: [],
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type } = e.target;

		if (type === "file") {
			const files = e.target.files;

			if (files) {
				const fileArray = Array.from(files);
				setFormData((prevData) => ({
					...prevData,
					[name]: fileArray,
				}));
			}
		} else {
			const { value } = e.target;
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handleCreateItem = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const newFormData = new FormData();
			newFormData.append('name', formData.name);
			newFormData.append('brand', formData.brand);
			newFormData.append('description', formData.description);
			newFormData.append('quantity', formData.quantity.toString());
			newFormData.append('price', formData.price.toString());
			newFormData.append('discountPrice', formData.discount.toString());
			formData.image.forEach((file) => {
				newFormData.append(`image`, file);
			});

			const response = await axios.post("http://localhost:3001/item", newFormData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setItems([...items, response.data]);
			setFormData({
				name: "",
				brand: "",
				description: "",
				quantity: 0,
				price: 0,
				discount: 0,
				image: [],
			});
		} catch (error) {
			console.error(error);
		}
	};

  return (
    <div className="admin-page__inner">
      <div className="create-item">
        <h1 className="title create-item__title">Create Item</h1>
        <form action="/item" method="post" encType="multipart/form-data" className="create-item__form" onSubmit={handleCreateItem}>
          {inputs.map((input) => {
            return (
              <div key={input.for} className={input.type === 'file' ? "create-item__input-holder create-item__input-holder--file" : "create-item__input-holder"}>
                <label htmlFor={input.for} className="create-item__label">
                  {input.label}
                </label>
                <input
									onChange={handleChange}
                  type={input.type}
									name={input.for}
                  id={input.for}
                  className="create-item__input"
									multiple={input.for === 'image'}
                />
              </div>
            );
          })}
					<div className="create-item__input-holder">
                <label htmlFor='category' className="create-item__label">
                  Kategorija:
                </label>
                <input
                  type='text'
									name='category'
                  id='category'
                  className="create-item__input"
                />
              </div>
					<button className="btn create-form__btn" type="submit">Kreiraj Proizvod</button>
        </form>
      </div>
    </div>
  );
};

export default CreateItem;
