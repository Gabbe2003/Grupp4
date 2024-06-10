import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { Home } from "./pages/Home.tsx";
import { PagesLayout } from "./pages/PagesLayout.tsx";
import { Checkout } from "../src/pages/Checkout.tsx";
import  { Register }  from "./pages/Register.tsx";
import { Login } from "./pages/Login.tsx";
import { Product } from "./pages/Product.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
    ],
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/pages",
    element: <PagesLayout />,
    children: [
      {
        path: "/pages/Checkout",
        element: <Checkout />,
      },
      {
        path: "/pages/Product/:movieId",
        element: <Product />,
      },
    ],
  },
]);
