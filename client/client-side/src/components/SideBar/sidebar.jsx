import { useAuthStore } from "../../store/authStore";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion as m, useScroll, useSpring } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function SideBar () {

    const { isAuthenticated } = useAuthStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);



    return (
        <>
            {isAuthenticated && (
                    <button
                        className="lg:hidden block"
                        onClick={toggleSidebar}
                    >
                    {isSidebarOpen ? <X size={30} /> : <Menu size={30} />}
                    </button>
            )}

          {isSidebarOpen && (
                <>
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSidebar}
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
                    />
                    <m.div
                        initial={{ x: "-100%" }}
                        animate={{ x: isSidebarOpen ? "0%" : "-100%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed left-0 top-0 w-64 h-full bg-light-background dark:bg-dark-background shadow-lg z-50 backdrop-blur-lg"
                    >
                        <nav
                            className="flex flex-col gap-6 p-6">
                        <NavLink
                            to="/"
                            className="text-lg text-black dark:text-white"
                            onClick={closeSidebar}>
                            Home
                        </NavLink>
                        <NavLink
                            to="/protected/club" 
                            className="text-lg text-black dark:text-white" 
                            onClick={closeSidebar}>
                            Club
                        </NavLink>
                        <NavLink 
                            to="/protected/posts" 
                            className="text-lg text-black dark:text-white" 
                            onClick={closeSidebar}>
                            Posts
                        </NavLink>
                        </nav>
                    </m.div>
                </>
            )}
        </>
    )
}