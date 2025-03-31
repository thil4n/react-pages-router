import { Navigate, Outlet, useLocation } from "react-router-dom";

enum RoutesState {
    Allowed,
    UnAuthenticated,
    UnAuthorized,
    Unsubscribed,
}

const AuthMiddleware = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const { userData } = useUser();
    const target: string = pathSegments[1] || "home";

    return <Outlet context={{ path: target }} />;

    const hasAccess = (path: string): RoutesState => {
        if (!userData) {
            return RoutesState.UnAuthenticated;
        }

        return RoutesState.UnAuthorized;
    };

    const accessState = hasAccess(target);
    console.log("AuthGuard", accessState);

    switch (accessState) {
        case RoutesState.Allowed:
            return <Outlet context={{ path: target }} />;
        case RoutesState.UnAuthenticated:
            return <Navigate to="/login" />;
        case RoutesState.Unsubscribed:
            return <Navigate to="/dashboard/subscription" />;
        case RoutesState.UnAuthorized:
            return <Navigate to="/unauthorized" />;
        default:
            return <Navigate to="/login" />;
    }

    // if (!user) return <Navigate to="/login" />;
    // // if (rand) {
    // //     return <Navigate to="/dashboard/subscription" />;
    // // }
    // if (!hasAccess(target)) {
    //     toast.error("You have no access to this section!");
    //     return <Navigate to="/dashboard" />;
    // }

    // return <Outlet context={{ path: target }} />;
};

export default AuthMiddleware;
