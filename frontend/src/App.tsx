import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/containers/Routes";

function App() {
  return (
		<BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
