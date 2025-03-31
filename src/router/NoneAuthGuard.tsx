import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@hooks";
import { toast } from "react-toastify";

const NoneAuthGuard = () => {
    const { userData } = useUser();

    if (userData) {
        toast.error("You have already logged  in!");
        return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
};

export default NoneAuthGuard;
