import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Dashboard, Login, Logout } from "../pages";
import AuthGuard from "./AuthGuard";
import NoneAuthGuard from "./NoneAuthGuard";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<NoneAuthGuard />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<AuthGuard />}>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
