import { useEffect, useState } from "react";
import axios from "axios";
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
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import LoadingSpinner from "../components/loadingSpinner";
import { useAtom } from "jotai";
import UiAtom from "../State/modalState";
import SecretSection from "../components/SecretePage";
import Overlays from "../components/overlays";


const fetchData = async () => {
  try {
    const ApI_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('jwtToken'); 
    const response  = await axios.get(`${ApI_URL}/api/club`, {
      headers: { 
        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    // console.log(response.data)
    return response.data;

  } catch (error) {
    console.error(error);
    throw error; // Ensure the error is propagated
  }
}

export default function ClubPage() {
  const images = {
    chess: chess,
    art: art,
    book: book,
    debate: debate,
    drama: drama,
    food: food,
    music: music,
    photo: photo,
    robot: robot,
    science: science,
  };

  const { data: clubData, error, isLoading } = useQuery('clubD', fetchData, {
    staleTime: 1000 * 60 * 5, // 5 minutes before the data is considered stale
    cacheTime: 1000 * 60 * 10, // 10 minutes to keep data in the cache
    refetchOnWindowFocus: false, // prevent refetching when the window is focused
  });



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
  

  

  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div >
      <Overlays />
      <div className="bg-[#fafafa] dark:bg-[#111827] h-screen">
      <div  className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-x-3 lg:min-w-[50%] max-w-[75%] 3xl:max-w-[65%] ml-auto mr-auto py-10 lg:px-2 top-0 relative z-1" >
        {clubData && clubData.clubs && clubData.clubs.length > 0 &&
          clubData.clubs.map((club, index) => {
           

            return (
              <div key={index}>
                <div className="max-w-lg bg-[#fafafa] dark:bg-[#1F2937] shadow-sm border-2 dark:border-none rounded-md text-black dark:text-white" key={index}>
                  <div>
                    <img src={images[club.coverpic]} alt="cover pic" className="w-full h-32 object-cover rounded-t-md" />
                  </div>
                  <div className="p-4 justify-between flex-col">
                    <div className="mt-4 flex flex-col gap-2">
                      <h1 className="text-xl font-Jersey">{club.name}</h1>
                      <p className="px-4 text-sm  font-Rubik border-l-4 text-balance border-black dark:border-white drop-shadow-md mb-6">
                        {club.description}
                      </p>
                    </div>

                        <button
                          onClick={()=> openSecretModal(club.id)}
                          className="text-white px-5 rounded-md font-new-amsterdam bg-[#000] dark:bg-[#0D9488] border-white shadow-md border-[1px]">
                          Join
                        </button>

                  </div>
                </div>
              </div>
            );
          })
        }
      </div>

     
      </div>
      
    </div>
  );
}
