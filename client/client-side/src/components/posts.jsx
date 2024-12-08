import Post from "./post";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect } from "react";



const Posts =()=>{
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
        withCredentials: true,
      });
      return response.data.result; // Return only the result data
    } catch (err) {
      console.error("Error fetching data:", err);
      return []; // Return an empty array on error
    }
  };

  const {
    data: messages3 = [], // Default to an empty array if no data
    error,
    isLoading,
  } = useQuery(["messages3"], fetchData, {
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

             <div  className="grid grid-cols-1 px-5 2xl:px-16 xl:px-10 py-10 bg-[#fafafa] dark:bg-[#111827] gap-x-3 gap-y-4 w-[90%] md:w-[70%] ml-auto mr-auto min-h-screen">
            {messages3.slice(0,9).map((msg, index) => (
                <Post key={index} data={msg} />
            ))}
            </div>
            )
}
     

export default Posts;