import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

import plus from "../../../assets/plus.svg";
import art from "../../../assets/club-icons/art.svg";
import book from "../../../assets/club-icons/book.svg";
import chess from "../../../assets/club-icons/chess.svg";
import debate from "../../../assets/club-icons/debate.svg";
import drama from "../../../assets/club-icons/drama.svg";
import food from "../../../assets/club-icons/food.svg";
import music from "../../../assets/club-icons/music.svg";
import photo from "../../../assets/club-icons/photo.svg";
import robot from "../../../assets/club-icons/robot.svg";
import science from "../../../assets/club-icons/science.svg";
import LoadingSpinner from "../../custom/loadingSpinner";

const MakePost = () => {
  const [message, setMessage] = useState('');
  const { id } = useParams();

  const userAndClubDataFecth = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
 
    
    const [clubDataFetch, userDataFetch] =  await Promise.all([
        axios.get(`${API_URL}/api/club-joined/${id}`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }),
             axios.get(`${API_URL}/api/user`, {
                headers: {
                "Content-Type": "application/json",
                },
                withCredentials: true,
            })
    ]);
    
    return {
      clubData: clubDataFetch.data.result,
      userData: userDataFetch.data.user
    }
  };

  

  

  const { data, isLoading, isError } = useQuery(
    ['userAndClubData', id],
    userAndClubDataFecth,
    {
      enabled: !!id, // Ensure the query runs only if `id` exists
    }
  );

  if (isLoading) return (
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 w-full max-w-md mx-auto">
  
  <div class="flex items-center justify-between animate-pulse">
    <div class="flex items-center space-x-3">
    
      <div class="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700"></div>
    
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </div>
    </div>
    
    <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
  </div>

  
  <div class="mt-6 animate-pulse">
    
    <div class="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
   
    <div class="mt-4 w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto"></div>
  </div>
</div>);

  if (isError) return <p>Error loading data. Please try again later.</p>;

  const {clubData, userData} = data || {};
  console.log(clubData, userData);

  const images = {
    1: chess,
    2: book,
    3: art,
    4: science,
    5: music,
    6: drama,
    7: robot,
    8: debate,
    9: food,
    10: photo,
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('Post message cannot be empty!');
      return;
    }
    try{
            const API_URL = import.meta.env.VITE_API_URL;
            const token = localStorage.getItem('jwtToken');
            if (!token) throw new Error('User is not authenticated');
            const response = await axios.post(`${API_URL}/api/postMessage`, {
                content: message,
                user_id: userData.id,
                club_id: id
            }, {
                headers: {
  
                  "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setMessage('');
            return response.data;
    }catch(err){
        console.log(err);
    }

}
   

  return (
    <div className="py-5 border-2 w-[28rem] bg-white  items-center rounded-xl space-y-7 shadow-sm sticky top-20 dark:bg-[#1F2937]">
      <div id="userDetails" className="flex space-x-2 justify-between w-[90%] ml-auto mr-auto">
        <div className="flex space-x-3 items-center">
          <div id="profilePic" className="rounded-[50%] w-14 h-14 border-2 border-black dark:bg-white text-center flex items-center ">
            {/* <img
              src="" // Add a dynamic profile picture URL or fallback image
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            /> */}
            <p className='items-center text-2xl text-black dark:text-white mx-auto font-new-amsterdam'>
            {userData.firstname.charAt(0).toUpperCase()}
            </p>
          </div>

          <div id="userInfo">
            <h3 className='capitalize font-Rubik font-medium'>{userData.firstname} {userData.lastname[0]}.</h3>
            <p className="text-sm text-opacity-70 text-black font-Rubik">{userData.email}</p>
          </div>
        </div>

        <div className="items-center flex space-x-2">
          <div className="rounded-[50%] border-2 border-black w-8 h-8 p-2">
            <img
              src={images[id] || art} // Provide a default image
              alt="Club Icon"
              className="w-full h-full"
            />
          </div>

          <p className="text-sm capitalize font-Rubik">
            {isLoading ? "Loading..." : isError ? "Error!" : clubData[0]?.name || "Unknown Club"}
          </p>
        </div>
      </div>

      <div id="postForm" className="mr-auto ml-auto border-2 w-[95%] rounded-2xl flex flex-col p-2">
        <form onSubmit={handlePostSubmit} className="justify-between flex">
          <textarea
            name="postMessage"
            id="userPost"
            placeholder="What's on your mind?"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="w-[95%] focus:outline-none text-sm bg-white  border-none resize-none overflow-hidden scrollbar-hide dark:bg-[#6d7075] dark:outline-none p-1"
            rows="1"
            cols="20"
          ></textarea>
          <button
            type="submit"
            className="bg-black text-white rounded-[50%] w-7 h-7 items-center justify-center inline-flex"
          >
            <img src={plus} className="w-3 h-3" alt="Add Post" />
          </button>
        </form>
      </div>
    </div>
  );
}


export default MakePost;
