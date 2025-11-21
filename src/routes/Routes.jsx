import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import ProductDetails from "../pages/ProductDetails";
import MyImports from "../pages/MyImports";
import AllProducts from "../pages/AllProducts";
import AddExport from "../pages/AddExport";
import MyExports from "../pages/MyExports";
import LearnMore from "../pages/LearnMore";
import PrivateRoute from "../pages/PrivateRoute";
import Support from "../pages/Support";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
        loader: () => fetch("http://localhost:3000/latest-products"),
      },
      {
        path: "/allProducts",
        element: <AllProducts></AllProducts>,
        loader: () => fetch("http://localhost:3000/all-products"),
      },
      {
        path: "/productDetails/:id",
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
      },
      {
        path: "/myImports",
        element: <PrivateRoute><MyImports></MyImports></PrivateRoute>,
      },
      {
        path: "/learnMore", //Extra Page
        element: <LearnMore></LearnMore>,
      },
      {
        path: "/addExport",
        element: <PrivateRoute><AddExport></AddExport></PrivateRoute>,
      },
      {
        path: "/myExports",
        element: <PrivateRoute><MyExports></MyExports></PrivateRoute>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/support",  //Extra Page
        element: <Support></Support>,
      },
    ],
  },
]);

export default router;
