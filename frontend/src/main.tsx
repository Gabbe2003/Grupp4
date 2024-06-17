import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CookiesProvider>
    <GoogleOAuthProvider clientId="1063188536262-lsleaacid57bmcsuu1ivanr271qmn0si.apps.googleusercontent.com">
      <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
      </React.StrictMode>
    </GoogleOAuthProvider>
  </CookiesProvider>
);
