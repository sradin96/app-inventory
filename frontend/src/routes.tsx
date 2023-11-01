import Home from "./components/pages/Home";
import { Route } from "./types/types";

export const routes = [
  {
    path: "/",
    isPublic: true,
    content: <Home />,
  }
] as Route[]