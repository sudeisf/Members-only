import Post from "../../components/post/post";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAnimate } from "motion/react-mini";
import { useEffect } from "react";

const Posts = ({ isCompact = false }) => {
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
      return response.data.result;
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  };

  const {
    data: messages2 = [],
    error,
    isLoading,
  } = useQuery(["messages2", id], fetchData, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (messages2.length > 0) {
      animate(
        ".post",
        { opacity: 1, y: 0, scale: 1 },
        { duration: 0.6, delay: 0.1, ease: "easeOut" }
      );
    }
  }, [messages2, animate]);

  if (isLoading)
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 py-10">
        Loading posts...
      </div>
    );
  if (error) {
    console.error(error);
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-10">
        Error: Unable to load posts. Please try again later.
      </div>
    );
  }

  return (
    <div>
    <div
      ref={scope}
      className={`grid ${isCompact ? "grid-cols-1 gap-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}  p-4 w-full transition-colors duration-300`}
    >  
      {messages2.map((msg, index) => (
        <div
          key={index}
          className="post opacity-0 translate-y-6 scale-95 py-2 transform transition-all duration-500 ease-out  rounded-lg overflow-hidden bg-inherit dark:bg-inherit"
        >
          <Post data={msg} />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Posts;