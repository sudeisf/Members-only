import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAnimate, motion, AnimatePresence } from "framer-motion";
import SuggestedClubsForSideline from "../components/club/suggestedClubsTwo";
import Post from "../components/post/post";
import Posts from "../components/posts";
import MakePost from "../components/post/make-post-page/AddPost";
import ClubSideline from "../components/post/post-home-page/JoinedClubs";

const PostHome = () => {
  const [scope, animate] = useAnimate();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const API = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${API}/api/message/`, {
        headers: { "Content-Type": "application/json" },
        params: { club_id: id },
        withCredentials: true,
      });
      return response.data.result || []; // Return empty array if no result
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  };

  const { data: messages2 = [], error, isLoading } = useQuery(
    ["messages2", id],
    fetchData,
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (messages2.length > 0) {
      animate(".post", { opacity: 1 }, { duration: 1, delay: 0.1 });
    }
  }, [messages2, animate]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) {
    console.error(error);
    return <div className="text-red-500 text-center py-10">Error: Unable to load posts. Please try again later.</div>;
  }

  return (
    <div className="bg-[#fefefe] dark:bg-[#111827] min-h-screen flex flex-col">
      {/* Main content with side-by-side layout */}
      <div className="flex flex-col lg:flex-row mx-auto w-full max-w-[1450px] gap-6 px-4 lg:px-8">
        {/* Left Sidebar: Single Container for Both Sections */}
        <motion.div
          className="lg:w-[280px] w-full lg:sticky lg:top-6 h-fit mb-6 lg:mb-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-Rubik uppercase font-medium underline-offset-4 underline py-4 mt-8 text-lg lg:text-xl text-black dark:text-white">
            My Clubs
          </h2>
          <ClubSideline />
          <h2 className="font-Rubik uppercase font-medium underline-offset-4 underline py-4 text-lg lg:text-xl text-black dark:text-white hidden lg:block">
            Suggested Clubs
          </h2>
          <div className="hidden lg:block">
            <SuggestedClubsForSideline navigate={navigate} />
          </div>
        </motion.div>

        {/* Right Content: Posts */}
        <div className="lg:flex-1 w-full">
          <h1 className="font-Rubik uppercase font-medium underline-offset-4 underline py-4 text-xl lg:text-2xl text-black dark:text-white">
            Posts
          </h1>
          <div
            ref={scope}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 min-h-[calc(100vh-10rem)]"
          >
            <AnimatePresence>
              {messages2.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="col-span-full flex flex-col items-center justify-center h-[20rem] text-center p-4"
                >
                  <p className="text-gray-600 dark:text-gray-400 font-Rubik text-base lg:text-lg mb-4 px-4">
                    No posts yet in this club! Be the first to share something.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/protected/posts/${id}/create`)}
                    className="px-4 sm:px-6 py-2 bg-blue-600 text-white font-Rubik rounded-full shadow-md hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base"
                  >
                    Create Post
                  </motion.button>
                </motion.div>
              ) : (
                messages2.map((msg, index) => (
                  <motion.div
                    key={msg.id || index}
                    className="post"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Post data={msg} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHome;