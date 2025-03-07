import { User, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Profile() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative pr-2">
            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
                <div className="flex justify-center items-center h-8 w-8 bg-black dark:bg-white dark:text-black text-white rounded-full border-black border-2">
                    <h1 className=''>S</h1>
                </div>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {isOpen && (
                <div className="absolute left-[-10rem] top-12 flex flex-col w-[200px] bg-white dark:bg-dark-background border-2 border-gray-500 shadow-md rounded-md">
                    <div className="flex items-center gap-2 py-2 p-3 w-full border-b-2 border-gray-100">
                        <div className="flex relative justify-center items-center h-8 w-8 bg-gray-300 rounded-full border-black border-2 ">
                            <h1 className="text-lg absolute -top-[1px] self-center">s</h1>
                        </div>
                        <div>
                            <h1 className="text-md font-Rubik">sudeis fedlu</h1>
                            <p className="text-xs font-Rubik text-gray-500">
                                Tech enthusiast & <br />
                                Developer
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            navigate("/protected/edit-profile");
                            setIsOpen(false);
                        }}
                        className="w-full h-10 flex text-black px-4 py-3 rounded-md mb-2 font-Rubik text-sm text-center space-x-2">
                        <User size={20} />
                        <span>Profile</span>
                    </button>
                    <button
                        onClick={() => {
                            logout();
                            navigate("/");
                            setIsOpen(false);
                        }}
                        className="w-full h-10 flex text-black px-4 py-3 rounded-md font-Rubik text-sm text-center space-x-2">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
}