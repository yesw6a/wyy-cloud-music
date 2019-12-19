import Home from "./pages/tabs/home";
import Hot from "./pages/tabs/hot";
import NotFound from "./pages/notFound";

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
    path: "",
    exact: false,
    component: NotFound
  }
];
