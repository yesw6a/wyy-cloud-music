import Home from "./pages/tabs/home";
import NotFound from "./pages/notFound";

export default [
  {
    path: "/",
    exact: true,
    components: Home
  },
  {
    components: NotFound
  }
];
