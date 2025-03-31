import React, { useEffect } from "react";
import { useUser } from "@hooks";
import { redirect } from "react-router-dom";

const LogoutPage: React.FC = () => {
    const { logout } = useUser();

    useEffect(() => {
        logout();
        redirect("/login");
    }, []);

    return <div>Logging out...</div>;
};

export default LogoutPage;
