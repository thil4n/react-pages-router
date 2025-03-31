import React from "react";

const modules = import.meta.glob<{ default: React.ComponentType<any> }>(
    "./pages/**/*.tsx"
);

const wrapWithLayout = (Component: any, Layout: any) => {
    return React.createElement(
        React.Suspense,
        {
            fallback: React.createElement("div", null, "loading"),
        },
        Layout
            ? React.createElement(Layout, null, React.createElement(Component))
            : React.createElement(Component)
    );
};

const routes = Object.keys(modules).map((path) => {
    const routePath = path

        .replace("./pages", "")
        .replace(/\/index\.tsx$/, "/")
        .replace(/\[([^\]]+)]/g, ":$1");

    const layoutPath = path.split();
});
