import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../src/pages/Layout.tsx";
import { NotFound } from "../src/pages/NotFound.tsx";
import { Home } from "../src/pages/home.tsx";
import { PagesLayout } from "../src/pages/PagesLayout.tsx";
// import { Checkout } from "../src/pages/Checkout.tsx";
import { Register } from "../src/pages/Register.tsx";
import { Login } from "../src/pages/Login.tsx";

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
      //   {
      //     path: "/pages/Checkout",
      //     element: <Checkout />,
      //   },
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
