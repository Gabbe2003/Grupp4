import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { Home } from "./pages/home.tsx";
import { PagesLayout } from "./pages/PagesLayout.tsx";
import { Checkout } from "./pages/checkout.tsx";
import { Register } from "./pages/Register.tsx";
import { Login } from "./pages/Login.tsx";

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
    path: "/pages",
    element: <PagesLayout />,
    children: [
      {
        path: "/pages/Checkout",
        element: <Checkout />,
      },
      {
        path: "/pages/Register",
        element: <Register />,
      },
      {
        path: "/pages/Login",
        element: <Login />,
      },
    ],
  },
]);
