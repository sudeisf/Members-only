import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAtom } from "jotai";
import UiAtom from "../../State/modalState";
import { useQuery } from "react-query";
import LoadingSpinner from "../custom/loadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import Overlays from "../modals/overlays";

const SuggestedClubsForSideline = ({ navigate }) => {
  const { isAuthenticated } = useAuthStore();
  const [err, setErr] = useState("");
  const [ui, setUi] = useAtom(UiAtom);

  const openSecretModal = (clubID) => {
    setUi((prev) => ({
      ...prev,
      modals: {
        ...prev.modals,
        secretModal: {
          isOpen: true,
          clubId: clubID,
        },
      },
    }));
  };

  const fetchSuggestedClubs = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${API_URL}/api/club/`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data.clubs || [];
    } catch (error) {
      setErr(error.message);
      return [];
    }
  };

  const { data: suggestedClubs = [], error, isLoading } = useQuery(
    "suggestedClubsForSideline",
    fetchSuggestedClubs,
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center p-4">{error.message}</p>;

  return (
    <div className="rounded-xl bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 shadow-lg w-full max-w-md mx-auto md:max-w-full sticky top-20">
      <AnimatePresence>
        {suggestedClubs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center p-4"
          >
            <p className="text-gray-600 dark:text-gray-400 font-Rubik text-sm mb-4">
              No new clubs to suggest. Explore more to find your fit!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/protected/club")}
              className="px-4 py-2 bg-black text-white font-Rubik rounded-full shadow-md hover:bg-black/90 transition-all text-sm w-full sm:w-auto"
            >
              Explore Clubs
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {suggestedClubs.slice(0, 5).map((club, index) => (
              <motion.div
                key={club.id}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="min-w-[2.5rem] h-[2.5rem] border-2 rounded-full border-black dark:border-white bg-white dark:bg-gray-800 flex items-center justify-center cursor-pointer">
                  <p className="font-Bebas-Neue text-lg text-black dark:text-white">
                    {club.name[0].toUpperCase()}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-sm font-medium font-Rubik text-black dark:text-white truncate">
                    {club.name}
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {club.member_count} members
                  </p>
                </div>
                <button
                  onClick={() => openSecretModal(club.id)}
                  className="py-1 px-3 rounded-md font-Rubik text-xs text-white shadow-sm bg-black dark:bg-[#0D9488] whitespace-nowrap"
                >
                  Join
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {suggestedClubs.length > 0 && (
        <NavLink
          to="/protected/club"
          className="mt-4 block text-center font-new-amsterdam border-b-2 border-black dark:border-white text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm sm:text-base"
        >
          See More Clubs
        </NavLink>
      )}
      
      <Overlays />
    </div>
  );
};

export default SuggestedClubsForSideline;