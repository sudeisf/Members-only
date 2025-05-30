import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import LoadingSpinner from "../../custom/loadingSpinner";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Added for animations

// Importing club icons
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

const ClubSideline = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const images = {
    chess,
    art,
    book,
    debate,
    drama,
    food,
    music,
    photo,
    robot,
    science,
  };

  const fetchData = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${API_URL}/api/club-joined`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data.result;
  };

  const { data: clublist = [], isLoading, isError, error } = useQuery(
    "clublist",
    fetchData,
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500 text-center p-4">Error fetching clubs: {error.message}</p>;
  }

  return (
    <div
      className="p-4 border-2 border-black dark:border-white rounded-xl bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 shadow-lg"
    >
      <AnimatePresence>
        {clublist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center p-4"
          >
            <p className="text-gray-600 dark:text-gray-400 font-Rubik text-sm mb-4">
              You haven’t joined any clubs yet! Explore new communities to get started.
            </p>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#000" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/protected/club")}
              className="px-4 py-1 bg-black text-white font-Rubik rounded-full shadow-md hover:bg-black/90 transition-all ease-in-out duration-200 text-sm"
            >
              Explore Clubs
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col space-y-4 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {clublist.map((club, index) => (
              <motion.div
                key={club.id}
                className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <div
                  className="relative border-2 rounded-full w-[3rem] h-[3rem] border-black dark:border-white bg-white dark:bg-gray-800 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
                  onClick={() => navigate(`/protected/posts/${club.id}`)}
                >
                  <img
                    src={images[club.coverpic] || photo}
                    alt={club.name}
                    className="w-full h-full object-cover p-1"
                  />
                </div>
                <p className="text-sm font-Rubik font-semibold text-black dark:text-white truncate flex-1">
                  {club.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClubSideline;