import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
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




export default function ClubPage() {

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
  const [clubData, setClubData] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/club');
        setClubData(response.data.club);
        setErr('');
      } catch (error) {
        setErr(error.response?.data?.msg || "Error fetching clubs");
        console.log(error.response?.data || error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
     
        
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-x-3 lg:min-w-[50%] max-w-[75%] 3xl:max-w-[65%] ml-auto mr-auto py-10 lg:px-2">
      {clubData.length > 0 ? (
        clubData.map((club, index) => (
          <div className="max-w-lg  bg-[#1F2937]  drop-shadow-md  rounded-md *:text-white  " key={index}>
            <div>
              <img src={images[club.coverpic]} alt="cover pic" className="w-full h-32 object-cover rounded-t-md " />
            </div>
            <div className="p-4 justify-between flex-col">
            <div className="mt-4 flex flex-col gap-2">
              <h1 className="text-xl font-Jersey">{club.name}</h1>
              <p className="px-4 text-sm text-white font-Rubik border-l-4 text-balance border-white drop-shadow-md ">{club.description}</p>
            </div>
            <button className="mt-4 text-white   px-5 rounded-md font-new-amsterdam bg-[#111827] border-white    shadow-md  border-[1px] ">
              Join
            </button>
            </div>
            
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center text-red-500">
          {err || "No clubs available"}
        </p>
      )}
    </div>
    </div>
   
  );
}
