import React, { useState } from 'react';
import auth from '../assets/authentication.svg';
import axios from 'axios';
import UiAtom from '../State/modalState';
import { useAtom } from 'jotai';
import { useLocation , useNavigate } from 'react-router-dom';

function SecretSection() {
   const para = useLocation();
   const nav = useNavigate();
   const [secretKey , setSecretKey] = useState('');

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
          nav('/protected/posts');
        }
        closeSecretModal();
    } catch (err) {
        console.log(err.message);
    }
}

  return (
    <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-50">
      
      <div className="relative bg-[#111827] p-10 rounded-lg shadow-lg z-50 w-full max-w-lg mx-auto flex flex-col items-center"> {/* Modal */}
      <div className='absolute top-2 right-2'>
            <button
              type="button"
              onClick={closeSecretModal}
              className=" text-white font-bold  px-4 rounded w-fit text-2xl -auto"
            >
              x
            </button>
            </div>
        <div className='flex flex-col gap-3 items-center'>
          <img src={auth} alt="otp-logo" className='w-36 h-36' />
          <p className='text-white font-Rubik font-normal text-xl text-center'>
            Please enter the secret passcode for the club
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
                className="text-black text-2xl h-10 shadow-sm w-full rounded-lg px-2 placeholder:text-[#d9d9d9] bg-[#fff] focus:outline-none border-[#0D9488] autofill:bg-[#111827] placeholder:font-new-amsterdam"  />
              </div>
              <div>
                <button className='text-white bg-[#0D9488] w-24 rounded-md uppercase py-1 font-Bebas-Neue'>
                  Enter
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SecretSection;
