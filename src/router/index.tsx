import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./routes";

const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {useRoutes(routes)}
        </Suspense>
    );
};

const Router = () => {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
};

export default Router;
