import Post from "../../components/post/post";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useAnimate} from "motion/react-mini"
import { useEffect } from "react";

const Posts = () => {
  const [scope, animate] = useAnimate();
  const { id } = useParams();
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const API = import.meta.env.VITE_API_URL;
      
      const response = await axios.get(`${API}/api/message/`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          club_id: id,
        },
        withCredentials: true,
      });
      return response.data.result; // Return only the result data
    } catch (err) {
      console.error("Error fetching data:", err);
      return []; // Return an empty array on error
    }
  };

  const {
    data: messages2 = [], // Default to an empty array if no data
    error,
    isLoading,
  } = useQuery(["messages2", id], fetchData, {
    staleTime: 1000 * 60 * 5 , // Cache data for 5 minutes
    cacheTime: 1000 * 60 * 10, // Keep unused data in cache for 10 minutes
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });

  useEffect(() => { 
    if(messages2.length > 0){
      animate(".post", { opacity: 1 }, { duration: 1, delay: 0.1 });
    }
  }, [messages2]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error(error);
    return <div>Error: Unable to load posts. Please try again later.</div>;
  }

 

    return ( 
          
            <div 
            ref={scope}
             className="grid grid-cols-1  2xl:px-16 xl:px-10 [scrollbar-width:none] mt-2 pt-2  dark:bg-[#111827] gap-x-3 gap-y-4 w-full md:w-full ml-auto mr-auto min-h-screen overflow-y-scroll  ">
                {messages2.map((msg, index) => (
                    <div key={index} className="post">
                    <Post key={index} data={msg} />
                    </div>
                ))}
                </div>
       

        
       )
}

export default Posts;














