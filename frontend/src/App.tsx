import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/containers/Routes";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import { AuthProvider } from "./store/auth-context";
import { ThemeProvider } from "./store/theme-context";
import { ItemsProvider } from "./store/items-context";
import { FavouritesProvider } from "./store/favourites-context";
import { CartProvider } from "./store/cart-context";

function App() {
  return (
		<BrowserRouter>
			<ThemeProvider>
				<AuthProvider>
					<ItemsProvider>
						<FavouritesProvider>
							<CartProvider>
								<Header />
								<AppRoutes />
								<Footer />
							</CartProvider>
						</FavouritesProvider>
					</ItemsProvider>
				</AuthProvider>
			</ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
