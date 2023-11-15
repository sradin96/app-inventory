import AdminPage from "./components/pages/AdminPage";
import AllItems from "./components/pages/AllItems";
import CreateEvent from "./components/pages/CreateEvent";
import CreateItem from "./components/pages/CreateItem";
import Cart from "./components/pages/Cart";
import FavouritesPage from "./components/pages/FavouritesPage";
import Home from "./components/pages/Home";
import ItemPage from "./components/pages/ItemPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import SearchPage from "./components/pages/SearchPage";
import Settings from "./components/pages/Settings";
import { Route } from "./types/types";

export const routes = [
  {
    path: "/",
    isPublic: true,
    content: <Home />,
  },
	{
    path: "/korisnik",
    isPublic: true,
    content: <Login />,
  },
	{
    path: "/registracija",
    isPublic: true,
    content: <Register />,
  },
	{
    path: "/podesavanja",
    isPublic: false,
    content: <Settings />,
  },
	{
    path: "/admin-stranica",
    isPublic: false,
		isAdmin: true,
    content: <AdminPage />,
		nestedContent: [
			{
				path: "svi-proizvodi",
				content: <AllItems />
			},
			{
				path: "nov-proizvod",
				content: <CreateEvent />
			},
			{
				path: "nov-dogadjaj",
				content: <CreateItem />
			},
		]
  },
	{
    path: "/korpa",
    isPublic: true,
    content: <Cart />,
  },
	{
    path: "/item/:id",
    isPublic: true,
    content: <ItemPage />,
  },
	{
    path: "/items/search",
    isPublic: true,
    content: <SearchPage />,
		exact: true
  },
	{
    path: "/favourites/:id",
    isPublic: true,
    content: <FavouritesPage />,
		exact: true
  },
] as Route[]