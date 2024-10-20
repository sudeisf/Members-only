import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { NavLink } from "react-router-dom";

import chess from '../assets/club/chess.jpg';
import art from '../assets/club/art.jpg';
import book from '../assets/club/book.jpg';
import debate from '../assets/club/debate.jpg';
import drama from '../assets/club/drama.jpg';
import food from '../assets/club/food.jpg';
import music from '../assets/club/music.jpg';
import photo from '../assets/club/photography.jpg';
import robot from '../assets/club/robot.jpg';
import science from '../assets/club/science.jpg';
import { useQuery } from "react-query";

export default function Club(){
    const images ={
        chess: chess,
        art: art,
        book : book,
        debate: debate,
        drama: drama,
        food: food,
        music: music,
        photo: photo,
        robot: robot,
        science :science 
    }
    
  const { isAuthenticated } = useAuth();

  const [err, setErr] = useState("");

  const fetchData = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('jwtToken');
   const response = await axios.get(`${API_URL}/api/clubs`,{
     headers: { 
         Authorization: token, 
         "Content-Type": "application/json" 
     },
     withCredentials: true 
   });
   
    return response.data;
   }
   
   const  {data: clubData, error , isLoading} = useQuery('clubData2', fetchData,{
    staleTime: 1000 * 60 * 5, // 5 minutes before the data is considered stale
    cacheTime: 1000 * 60 * 10 , // 10 minutes to keep data in the cache 
    refetchOnWindowFocus: false, // prevent refaching when the window is focused
  });
  
  if(isLoading){
    return <div>Loading</div>;
  }

  if(error){
    return <div>{error.message}</div>
  }
   // Empd0dbf3
    return (
        <div className=" w-[40%] 2xl:pr-20 h-[650px] rounded-md  mt-[2rem] sticky top-[70px] z-10 p-2 flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4 w-full   ">
      {clubData.club.length > 0 && 
        clubData.club.slice(0,5).map((club, index) => (
          <div className="min-w-md max-w-xl p-2 bg-[#1F2937]   items-center rounded-xl border-r border-b border-l border-t border-[#9c9a9a52]  flex justify-between  " key={index}>
            <div className=" w-[30%]">
              {/* <img src={images[club.coverpic]} alt="cover pic" className=" h-full w-full object-cover  mr-auto ml-auto " /> */}
              <div
              className="  w-[3rem] h-[3rem] rounded-[50%] ml-5 bg-[#1F2937] border-[#0D9488]  border-[3px] text-center drop-shadow-sm     " 
              >
                    <p className="p-3 font-Bebas-Neue  text-sm text-white ">
                    {club.name[0]}
                    </p>
             </div>
            </div>
            <div className="p-3 flex justify-between w-[70%] items-center">
            <div className=" flex gap-2">
              <h1 className="text-md font-medium font-Rubik text-[#ffffff] drop-shadow-sm">{club.name}</h1>
              {/* <p className="px-4 text-sm text-slate-500 font-Rubik border-l-4 text-balance border-orange-600 ">{club.description}</p> */}
            </div>
            <button className="   py-1 px-7 rounded-md font-Rubik  text-sm text-white shadow-sm bg-[#0D9488] ">
              Join
            </button>
            </div>
            
          </div>
        ))}
        </div>

        <NavLink to='/protected/club' className={'mr-auto ml-auto'}>
          <button className="text-center items-center  font-new-amsterdam  border-b-2 text-white drop-shadow-md">
              see more 
          </button>
        </NavLink>
       
        </div>
    )
}