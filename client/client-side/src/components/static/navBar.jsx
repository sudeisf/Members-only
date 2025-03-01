import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/ThemeContext";
import CustomIcon from "../custom/darkNdNigt";
import CustomLockIcon from "../custom/lockIcon";
import { motion as m, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NavBar = ({ onLoginClick, onSignUpClick, onOpenS, onOpenL }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toggleTheme, darkMode } = useTheme();
  const color = darkMode ? "dark" : "light";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <nav
        className={`${
          onOpenS || onOpenL ? "" : " sticky top-0 z-50"
        }  text-black bg-[#F9FAFB] dark:text-white w-full flex flex-row justify-between p-2 dark:border-[#d5d4d489] dark:border-1 items-center dark:bg-dark-background`}
      >
        <div className="flex items-center align-middle">
          <div className="rounded-[50%] w-9 h-9 dark:border-white border-2 border-black drop-shadow-md items-center">
            <CustomLockIcon color={color} className="mr-auto ml-auto w-5 h-5 mt-[6px]" />
          </div>
          <p className="font-new-amsterdam text-[1.2rem] ml-3 uppercase drop-shadow-xl tex-dark">
            members-only
          </p>
        </div>

        {/* Desktop Menu */}
        {isAuthenticated && (
          <div className="lg:flex flex-row gap-6 hidden">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `font-Rubik capitalize space-x-2 h-7 text-[1rem] ${
                  isActive ? "border-b-2 border-dark-background dark:border-white" : ""
                }`
              }
            >
              home
            </NavLink>
            <NavLink
              to="/protected/club"
              className={({ isActive }) =>
                `font-Rubik capitalize space-x-2 h-7 text-[1rem] ${
                  isActive ? "border-b-2 border-dark-background dark:border-white" : ""
                }`
              }
            >
              club
            </NavLink>
            <NavLink
              to="/protected/posts"
              className={({ isActive }) =>
                `font-Rubik capitalize space-x-2 h-7 text-[1rem] ${
                  isActive ? "border-b-2 border-dark-background dark:border-white" : ""
                }`
              }
            >
              posts
            </NavLink>
          </div>
        )}

        {/* Theme & Auth Buttons */}
        <div className="flex items-center align-middle gap-4">
          <CustomIcon colorMode={color} className="w-5 h-5" onClick={toggleTheme} />

          {!isAuthenticated && (
            <div className="hidden md:flex gap-3">
              <button
                onClick={onSignUpClick}
                className="text-white font-Rubik bg-dark-background dark:bg-[#0D9488] border-2 text-sm px-3 rounded-md shadow-sm py-1 capitalize"
              >
                sign up
              </button>
              <button
                onClick={onLoginClick}
                className="text-black dark:text-white font-Rubik text-md px-3 py-1"
              >
                Login
              </button>
            </div>
          )}

          {isAuthenticated && (
            <button
              onClick={() => {
                navigate("/");
                logout();
              }}
              className="bg-dark-background dark:bg-[#0D9488] text-white font-Bebas-Neue capitalize px-3 py-1 text-[1rem] font-light rounded-md shadow-md"
            >
              log out
            </button>
          )}

          {/* Hamburger Menu (Mobile Only) */}
          {isAuthenticated && (
            <button
              className="lg:hidden block"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          )}
        </div>
      </nav>

      {/* Sidebar Mobile Menu */}
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
            <nav className="flex flex-col gap-6 p-6">
              <NavLink to="/" className="text-lg text-black dark:text-white" onClick={closeSidebar}>
                Home
              </NavLink>
              <NavLink to="/protected/club" className="text-lg text-black dark:text-white" onClick={closeSidebar}>
                Club
              </NavLink>
              <NavLink to="/protected/posts" className="text-lg text-black dark:text-white" onClick={closeSidebar}>
                Posts
              </NavLink>
            </nav>
          </m.div>
        </>
      )}

      {/* Progress Bar */}
      <m.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 z-50 left-0 right-0 h-[4px] bg-dark-background dark:bg-[#0D9488]"
      />
    </>
  );
};

export default NavBar;
