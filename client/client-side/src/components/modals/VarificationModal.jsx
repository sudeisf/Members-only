import React, { useState } from 'react';
import auth from '../../assets/authentication.svg';
import axios from 'axios';
import UiAtom from '../../State/modalState';
import { useAtom } from 'jotai';
import { useLocation , useNavigate } from 'react-router-dom';
import {useTheme} from '../../Context/ThemeContext';
import { set } from 'date-fns';
import {LoaderCircle} from "lucide-react"
import { toast } from "react-hot-toast";


function SecretSection() {
   const para = useLocation();
   const nav = useNavigate();
   const [secretKey , setSecretKey] = useState('');
   const [isLoading, setIsLoading] = useState(false)
   const {toggleTheme , darkMode} = useTheme();

   const [ui, setUi] = useAtom(UiAtom);
  //  console.log(ui.modals.secretModal.clubId);
   const clubIdentifier = ui.modals.secretModal.clubId

   const closeSecretModal = () => {
     setUi((prev) => ({
       ...prev,
       modals: {
         ...prev.modals,
         secretModal: {
           isOpen: false
         },
       },
     }));
   };
   

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setIsLoading(true)
        const API_URL = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('jwtToken');
        
        const res = await axios.post(
            `${API_URL}/api/club-join/${clubIdentifier}`,
            { secretKey: secretKey },
            {
                headers: { 
                    Authorization: token, 
                    "Content-Type": "application/json" 
                },
                withCredentials: true 
            }
        );
        const data = res.data;
        if(data.success){
          setIsLoading(false)
          toast.success("Joined successfully", {
            position: "top-right",
          });
          nav(`/protected/posts/${clubIdentifier}`);
        }
        closeSecretModal();
    } catch (err) {
        setIsLoading(false)
        toast.error(err.response?.data?.message || err.message || "Failed to join club");
    }
}

  return (
    <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-50  ">
      
      <div className="relative bg-[#fefefe] dark:bg-[#1F2937] border-2 dark:border-none p-10 rounded-lg shadow-lg z-50 w-full max-w-lg mx-auto flex flex-col items-center min-h-[400px] min-w-[400px]"> {/* Modal */}
      <div className='absolute top-2 right-2'>
            <button
              type="button"
              onClick={closeSecretModal}
              className=" text-black dark:text-white font-bold  px-4 rounded w-fit text-2xl -auto"
            >
              x
            </button>
            </div>
        <div className='flex flex-col gap-3 items-center'>
          <img src={auth} alt="otp-logo" className='w-36 h-36' />
          <p className='dark:text-white text-black font-Rubik font-normal text-xl text-center'>
           secret passcode 
          </p>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-center'>
              <div>

               
             <input 
                type="text"
                name="secret" 
                value={secretKey}  
                onChange={(e) => setSecretKey(e.target.value)}  
                placeholder='Secret key'
                className="text-black text-xll h-10 drop-shadow-sm w-full rounded-md border px-2 placeholder:text-[#000] bg-[#fff] focus:outline-none  border-[#00000046]  autofill:bg-[#111827] placeholder:font-Rubik"  /> 
              </div>
              <div>
                <button className='text-white bg-black dark:bg-[#0D9488] w-24 rounded-md uppercase py-1 font-Bebas-Neue'>
                 {isLoading ? <LoaderCircle className='w-4 h-4 mx-auto animate-spin m-2'/> : "Enter"}
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SecretSection;
