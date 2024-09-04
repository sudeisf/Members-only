import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import lock from '../assets/lock.svg'
import unlock from '../assets/unlock.svg'

const NavBar = ({ onLoginClick , onSignUpClick ,onOpenS,onOpenL }) => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className={` ${(onOpenS || onOpenL) ?'' : ' sticky top-0 z-50'} top-0 text-slate-100 w-full flex flex-row justify-between p-2  items-center ${isAuthenticated ? 'bg-[#111827] ' : 'bg-[#111827]'} `}>
            <div className="flex items-center align-middle">
                <div className="rounded-[50%] w-9 h-9 border-white border-2 drop-shadow-md">
                <img src={`${isAuthenticated ? unlock : lock}`} alt="fd" className="w-4 mt-[8px] ml-auto mr-auto shadow-md" />
                </div>
                <p className={`font-new-amsterdam text-[1.2rem] ml-3 uppercase drop-shadow-xl ${isAuthenticated ? 'text-white' : 'text-white'}`}>members-only</p>
            </div>
            <div className="flex w-[30%] justify-around">
            {isAuthenticated && (
                <div className="md:flex flex-row gap-6 ">
                    <NavLink
                        to='/'
                        end
                        className={({ isActive }) =>
                            `font-Rubik capitalize space-x-2 h-7 text-[1rem] ${isActive ? 'border-b-2  border-white border-solid ' : ''}`
                        }
                    >
                        home
                    </NavLink>
                    <NavLink
                        to='/protected/club' 
                        className={({ isActive }) =>
                            `font-Rubik capitalize space-x-2 h-7 text-[1rem] ${isActive ? 'border-b-2 border-white' : ''}`
                        }
                    >
                        club
                    </NavLink>
                    <NavLink
                        to='/posts'
                        className={({ isActive }) =>
                            `font-Rubik capitalize space-x-2 h-7 text-[1rem] ${isActive ? 'border-b-2 border-white' : ''}`
                        }
                    >
                        posts
                    </NavLink>
                   
                </div>
            )}

            <div className="flex gap-3">
                {!isAuthenticated && (
                    <div className="w-[26rem] flex  ">
                        <div className="ml-auto">
                    
                    <button
                            onClick={onSignUpClick}
                            className=" border-2 border-white text-white font-new-amsterdam bg-[#1F2937]   px-3 rounded-md shadow-sm py-1"
                            >
                            signup
                        </button>
                        <button
                            onClick={onLoginClick}
                            className=" text-white font-new-amsterdam    px-3 rounded-md shadow-sm py-1"
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
                        className="bg-[#0D9488] text-white font-Bebas-Neue capitalize px-3 text-[1rem] font-light rounded-md shadow-md  border-2 border-white"
                    >
                        log out
                    </button>
                )}
            </div>
            </div>
           
        </nav>
    );
};

export default NavBar;
