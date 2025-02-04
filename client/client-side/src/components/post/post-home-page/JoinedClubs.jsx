import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import LoadingSpinner from "../../custom/loadingSpinner"
// import { Navigate } from "react-router-dom";


//importing the messages 
import art from '../../../assets/club-icons/art.svg'
import book from '../../../assets/club-icons/book.svg'
import chess from '../../../assets/club-icons/chess.svg'    
import debate from '../../../assets/club-icons/debate.svg'
import drama from '../../../assets/club-icons/drama.svg'
import food from '../../../assets/club-icons/food.svg'
import music from '../../../assets/club-icons/music.svg'
import photo from '../../../assets/club-icons/photo.svg'
import robot from '../../../assets/club-icons/robot.svg'
import science from '../../../assets/club-icons/science.svg'
import { useNavigate } from "react-router-dom";


const ClubSideline = () =>{

    const navigate = useNavigate()
    const [data, setData] = useState([]);

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


        const FecthData = async () =>{
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${API_URL}/api/club-joined`,{
             headers: { 
                 "Content-Type": "application/json" 
             },
             withCredentials: true 
           })
            return response.data.result;
        }


        const { data: clublist, isLoading, isError, error } = useQuery("clublist", FecthData, {
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
        });
        
        if (isLoading) {
            return <LoadingSpinner />;
        }
        
        if (isError) {
            return <p>Error fetching clubs: {error.message}</p>;
        }

    return (
        <div className="flex  space-x-10 justify-around dark:text-white overflow-x-scroll scroll-smooth  py-4 [scrollbar-width:none] p-4
         mr-auto mt-[1rem]  ml-auto border-2 border-black rounded-xl w-auto lg:w-[80%]" >
            {
            clublist.map((club)=>(
                    <div className="flex flex-col gap-2 items-center">
                      <div className="dark:border-white border-[.2rem] rounded-[50%] w-[4rem] h-[4rem] border-black items-center py-2  " onClick={() => navigate(`/protected/posts/${club.id}`)}>
                            <img src={images[club.coverpic]} alt="" className="w-14 h-10 " />
                        </div>
                        <p className="text-[1rem] font-Rubik font-semibold text-black">{club.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ClubSideline;