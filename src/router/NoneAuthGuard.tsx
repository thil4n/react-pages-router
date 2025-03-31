import { Navigate, Outlet } from "react-router-dom";

const NoneAuthGuard = () => {
    if (0) {
        return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
};

export default NoneAuthGuard;
