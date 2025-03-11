import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import MakePost from "../components/post/make-post-page/AddPost";
import Post from "../components/post/post";

const PostPage = () => {
  const { id } = useParams();
  const socket = useRef(null);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    socket.current = io(import.meta.env.VITE_API_URL, { withCredentials: true });

    socket.current.on('connect', () => {
      console.log('Socket connected');
    });

    
    socket.current.on('new_post', (newPost) => {
      console.log('Received new post:', newPost); 
      setPosts((prevPosts) => [newPost, ...prevPosts]); 
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);
  
 
  const fetchData = async () => {
    try {
      const API = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${API}/api/post/`, {
        headers: { "Content-Type": "application/json" },
        params: { club_id: id },
        withCredentials: true,
      });
      return response.data.result || [];
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  };

  const {
    data: initialPosts = [],
    error,
    isLoading,
  } = useQuery(["posts", id], fetchData, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !!id,
    onSuccess: (data) => {
      setPosts(data); // Set posts when data is successfully fetched
    },
  });

  // Show loading state
  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  // Handle errors
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
      <div className="flex-1 space-y-4 overflow-auto max-h-screen p-2 bg-gray-50 dark:bg-[#11182772] rounded-lg">
        {posts.length ? (
          posts.map((msg, index) => <Post key={index} data={msg} />)
        ) : (
          <p className="text-gray-500 text-center">No posts available.</p>
        )}
      </div>

     
      <div className="w-full md:w-[40%]  p-4 rounded-lg">
        <MakePost />
      </div>
    </div>
  );
};

export default PostPage;
