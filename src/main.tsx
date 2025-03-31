import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/main.css";

import Router from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ToastContainer />

        <Router />
    </React.StrictMode>
);
