import MakePost from "../components/post/make-post-page/AddPost";
import Post from "../components/post/post";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const API = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${API}/api/post/`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          club_id: id,
        },
        withCredentials: true,
      });

      return response.data.result || []; // Ensure it returns an array
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  };

  const {
    data: messages = [],
    error,
    isLoading,
  } = useQuery(["messages", id], fetchData, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) {
    console.error(error);
    return (
      <div className="text-center text-red-500 mt-10">
        Error: Unable to load posts. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full max-w-6xl mx-auto p-4">
      {/* Left Side: Posts */}
      <div className="flex-1 space-y-4 overflow-auto max-h-screen p-2 bg-gray-50 dark:bg-[#111827] rounded-lg">
        {messages.length > 0 ? (
          messages.slice(0, 9).map((msg, index) => <Post key={index} data={msg} />)
        ) : (
          <p className="text-gray-500 text-center">No posts available.</p>
        )}
      </div>

      {/* Right Side: Make Post (Form) */}
      <div className="w-full md:w-[40%] dark:bg-[#1F2937] p-4 rounded-lg">
        <MakePost />
      </div>
    </div>
  );
};

export default PostPage;
