import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthMiddlewareProps {
    children?: React.ReactNode;
    path: string;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children, path }) => {
    const isAuthenticated = true;

    const location = useLocation();

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Redirect to unauthorized page if user role doesn't match
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children};</>;
};

export default AuthMiddleware;
