import { lazy, Suspense, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { Skeleton, NavBar, SideBar } from "@components";

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    let { path }: { path: any } = useOutletContext();
    path = path ? path : "home";

    const LazyComponent = lazy(() => import(`./${path}/index.tsx`));
    return (
        <div>
            <NavBar toggleSidebar={toggleSidebar} collapsed={collapsed} />
            <div className="flex mt-[70px] gap-6">
                <div
                    className={`fixed h-screen bg-primary p-4 transition-all duration-300 ${
                        collapsed
                            ? "w-[100px] -mt-[70px]"
                            : "w-[220px] -mt-[70px]"
                    }`}
                >
                    {/* <button
                        onClick={toggleSidebar}
                        className="text-white bg-secondary p-2 rounded-md mb-4"
                    >
                        {collapsed ? "Expand" : "Collapse"}
                    </button> */}
                    <SideBar path={path} collapsed={collapsed} />
                </div>
                <div
                    className={`w-full transition-all duration-300 ${
                        collapsed ? "ml-[100px]" : "ml-[220px]"
                    } px-3`}
                >
                    <Suspense fallback={<Skeleton />}>
                        <LazyComponent />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
