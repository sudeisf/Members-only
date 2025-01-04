import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/ThemeContext";
import CustomIcon from "../custom/darkNdNigt";
import CustomLockIcon from '../custom/lockIcon'
import {motion as m , useScroll , useSpring} from "framer-motion";


const NavBar = ({ onLoginClick , onSignUpClick ,onOpenS,onOpenL }) => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const {toggleTheme , darkMode}  = useTheme();
    const color  =  darkMode ? 'dark' : 'light';

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
        

      })
    return (
        <>
        <nav  
        className={` ${(onOpenS || onOpenL) ?'' : ' sticky top-0 z-50'}  top-0 text-black bg-[#F9FAFB] dark:text-white w-full flex flex-row justify-between p-2 border-2 border-black dark:border-[#d5d4d489]  dark:border-1 items-center  dark:bg-dark-background `}>


            <div className="flex items-center align-middle">
                <div className="rounded-[50%] w-9 h-9 dark:border-white border-2 border-black  drop-shadow-md items-center">
                 <CustomLockIcon color={color}  className="mr-auto ml-auto w-5 h-5 mt-[5px]"/>
                </div>
                <p className={`font-new-amsterdam text-[1.2rem] ml-3 uppercase drop-shadow-xl tex-dark`}>members-only</p>
            </div>


             {isAuthenticated && (
                <div className="lg:flex flex-row gap-6 hidden">
                    <NavLink
                        to='/'
                        end
                        className={({ isActive }) =>
                            `font-Rubik capitalize space-x-2 h-7 text-[1rem] ${isActive ? 'border-b-2  border-dark-background border-solid dark:border-white ' : ''}`
                        }
                    >
                        home
                    </NavLink>
                    <NavLink
                        to='/protected/club' 
                        className={({ isActive }) =>
                            `font-Rubik capitalize space-x-2 h-7 text-[1rem] ${isActive ? 'border-b-2 border-dark-background dark:border-white' : ''}`
                        }
                    >
                        club
                    </NavLink>
                    <NavLink
                        to='/protected/posts'
                        className={({ isActive }) =>
                            `font-Rubik capitalize space-x-2 h-7 text-[1rem] ${isActive ? 'border-b-2 border-dark-background dark:border-white' : ''}`
                        }
                    >
                        posts
                    </NavLink>
                   
                </div>
              )}



               

            <div className="flex items-center align-middle gap-4 ">

                <div className="flex justify-end">
                        <CustomIcon 
                        colorMode = {color}
                            className="w-5 h-5"
                            onClick={toggleTheme} 
                            />  
                    </div>
            {!isAuthenticated && (
                    <div className=" flex justify-end">
                        <div className=" flex gap-3 ">
                    
                            <button
                                onClick={onSignUpClick}
                                className="  text-white font-Rubik bg-dark-background dark:bg-[#0D9488] border-2 text-sm  px-3 rounded-md shadow-sm py-1 capitalize"
                                >
                                sign up
                            </button>
                            <button
                                onClick={onLoginClick}
                                className=" text-black dark:text-white font-Rubik text-md    px-3 rounded-md shadow-sm py-1"
                                >
                                Login
                            </button>

                        </div>
                    </div>
                )}

             {isAuthenticated && (
                    <button
                        onClick={() => {
                            navigate('/');
                            logout();
                        }}
                        className="bg-dark-background dark:bg-[#0D9488] text-white font-Bebas-Neue capitalize px-3 py-1 text-[1rem] font-light rounded-md shadow-md  "
                    >
                        log out
                    </button>
                    )}
            </div>
         
        </nav>
        <m.div style={{ scaleX , transformOrigin: 'left' }} className="fixed top-0 z-50 left-0 right-0 bottom-0 h-[4px] bg-dark-background dark:bg-[#0D9488]  self-start" />
</>
        
    );
};

export default NavBar;
