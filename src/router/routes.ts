import React from "react";
import AuthMiddleware from "./AuthMiddleware";

const modules = import.meta.glob<{ default: React.ComponentType }>(
    "../pages/**/*.tsx"
);

const wrapWithLayout = (
    Component: React.ComponentType,
    Layout?: React.ComponentType
): JSX.Element => {
    return React.createElement(
        React.Suspense,
        { fallback: React.createElement("div", null, "loading...") },
        Layout
            ? React.createElement(Layout, null, React.createElement(Component))
            : React.createElement(Component)
    );
};

const routes = Object.keys(modules).map((path) => {
    const routePath = path
        .replace("../pages", "")
        .replace(/\/index\.tsx$/, "/")
        .replace(/\(.*?\)\//g, "")
        .replace(/\[([^\]]+)\]/g, ":$1");

    console.log(routePath);

    const layoutPath = path.replace(/\/[^/]+\.tsx$/, "/_layout.tsx");
    const Layout = modules[layoutPath]
        ? React.lazy(modules[layoutPath])
        : undefined;
    const Component = React.lazy(modules[path]);

    return {
        path: routePath === "" ? "/" : routePath,
        element: React.createElement(
            AuthMiddleware,
            { path: routePath },
            wrapWithLayout(Component, Layout)
        ),
    };
});

export default routes;
