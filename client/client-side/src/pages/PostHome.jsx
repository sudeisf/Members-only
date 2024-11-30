import Post from "../components/post";
import Posts from "../components/posts";
import MakePost from "../components/post/makePost";
import ClubSideline from "../components/post/clubSlideline";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PostHome = () => {

  const { id } = useParams();
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const API = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        navigate("/login"); // Redirect to login if no token
        throw new Error("User is not authenticated");
      }

      const response = await axios.get(`${API}/api/message/`, {
        headers: {
          Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
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

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error(error);
    return <div>Error: Unable to load posts. Please try again later.</div>;
  }

    return ( 
            <div className="bg-[#fefefe] dark:bg-[#111827]">
                <ClubSideline  />
            
            <div 
             className="grid grid-cols-3  2xl:px-16 xl:px-10 [scrollbar-width:none] mt-2 pt-2 bg-[#fefefe] dark:bg-[#111827] gap-x-3 gap-y-4 w-[70%] md:w-full ml-auto mr-auto min-h-screen overflow-y-scroll h-[70vh] shadow-lg border-[1px]">
                {messages2.map((msg, index) => (
                    <Post key={index} data={msg}/>
                ))}
                </div>
            </div>

        
       )
}

export default PostHome;














