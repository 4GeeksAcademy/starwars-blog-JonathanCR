import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StoreProvider } from "./hooks/useGlobalReducer";
import router from "./routes";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Font Awesome
import "@fortawesome/fontawesome-free/css/all.min.css";

// Tu CSS propio
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);