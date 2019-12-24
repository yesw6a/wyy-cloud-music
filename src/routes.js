import Home from "./pages/tabs/home";
import Hot from "./pages/tabs/hot";
import NotFound from "./pages/notFound";
import Player from "./pages/player";

export default [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/hot",
    exact: false,
    component: Hot
  },
  {
    path: "/song",
    exact: false,
    component: Player
  },
  {
    path: "",
    exact: false,
    component: NotFound
  }
];
