import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { Home } from "./pages/Home.tsx";
import { Checkout } from "../src/pages/Checkout.tsx";
import { Register } from "./pages/Register.tsx";
import { Login } from "./pages/Login.tsx";
import { Product } from "./pages/Product.tsx";
import { Thanks } from "./pages/Thanks.tsx";

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
      {
        path: "/checkout/",
        element: <Checkout />,
      },
      {
        path: "/registerUser",
        element: <Register />,
      },
      {
        path: "/loginUser",
        element: <Login />,
      },
      {
        path: "product/:movieId",
        element: <Product />,
      },
      {
        path: "thanks",
        element: <Thanks />,
      },
    ],
  },
]);
