import MakePost from "../components/post/make-post-page/AddPost";
import Post from "../components/post/post";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const PostPage = () => {
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

      const response = await axios.get(`${API}/api/post/`, {
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
    data: messages = [], // Default to an empty array if no data
    error,
    isLoading,
  } = useQuery(["messages", id], fetchData, {
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
    <div className="text-black flex flex-col-2 ml-auto mr-auto  h-[90vh] w-[80%]  bg-[#F9FAFB] ">
      {/* Left Side: Posts */}
      <div className="grid grid-cols-1 px-5 2xl:px-16 xl:px-10 h-full w-[50%] bg-[#F9FAFB] dark:bg-[#111827] gap-x-3 gap-y-4 overflow-y-scroll [scrollbar-width:none]">
        {messages.slice(0, 9).map((msg, index) => (
          <Post key={index} data={msg} />
        ))}
      </div>

      {/* Right Side: Make Post */}
      <div className="w-[50%] px-4 relative ">
        <MakePost />
      </div>
    </div>
  );
};

export default PostPage;
