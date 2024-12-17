import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAtom } from "jotai";
import UiAtom from "../../State/modalState";
import { useQuery } from "react-query";
import Overlays from "../overlays";

export default function Club(){

    
  const { isAuthenticated } = useAuth();

  const [err, setErr] = useState("");

  const fetchData = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('jwtToken');
    const response = await axios.get(`${API_URL}/api/club`,{
     headers: { 
         Authorization: token, 
         "Content-Type": "application/json" 
     },
     withCredentials: true 
   });
   
    return response.data;
   }

   const [ui, setUi] = useAtom(UiAtom);

  const openSecretModal = (clubID) => {
    setUi((prev) => ({
      ...prev,
      modals: {
        ...prev.modals,
        secretModal: {
          isOpen: true, 
          clubId : clubID,         
        },
      },
    }));
  };
   
   const  {data: clubs, error , isLoading} = useQuery('clubs', fetchData,{
    staleTime: 1000 * 60 * 5, // 
    cacheTime: 1000 * 60 * 10 , 
    refetchOnWindowFocus: false, 
  });
  
  if(isLoading){
    return <div>Loading</div>;
  }

  if(error){
    return <div>{error.message}</div>
  }
   // Empd0dbf3
    return (
        <div className=" w-[100%] md:w-[60%]  ml-auto mr-auto 2xl:pr-20 h-[650px] rounded-md  mt-[2rem] sticky top-[70px] z-10 p-2 flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4 w-full   ">
      {clubs.clubs?.length > 0 && 
        clubs.clubs.slice(0,5).map((club, index) => (
          <div className="min-w-md max-w-xl p-2 bg-white dark:bg-[#1F2937]   items-center rounded-xl border-r border-b border-l border-t border-[#9c9a9a52]  flex justify-between  " key={index}>
            <div className=" w-[30%]">
              <div
              className="  w-[3rem] h-[3rem] rounded-[50%] ml-5 bg-white dark:bg-[#1F2937] border-[#000] dark:border-[#0D9488]  border-[3px] text-center drop-shadow-sm     " 
              >
                    <p className="p-3 font-Bebas-Neue  text-sm text-black dark:text-white ">
                    {club.name[0]}
                    </p>
             </div>
            </div>
            <div className="p-3 flex justify-between w-[70%] items-center">
            <div className=" flex gap-2">
              <h1 className="text-md font-medium font-Rubik text-black dark:text-white drop-shadow-sm">{club.name}</h1>
              {/* <p className="px-4 text-sm text-slate-500 font-Rubik border-l-4 text-balance border-orange-600 ">{club.description}</p> */}
            </div>
            <button 
            onClick={() => openSecretModal(club.id)}
            className="   py-1 px-7 rounded-md font-Rubik  text-sm text-white shadow-sm bg-[#000] dark:bg-[#0D9488] ">
              Join
            </button>
            </div>
            
          </div>
        ))}
        </div>
        <Overlays/>
        <NavLink to='/protected/club' className={'mr-auto ml-auto'}>
          <button
           
           className="text-center items-center  font-new-amsterdam  border-b-2  border-black dark:border-white text-dark dark:text-white ">
              see more 
          </button>
        </NavLink>
        </div>
    )
}