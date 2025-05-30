import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { usePostStore } from "../../../store/postStore"

import plus from "../../../assets/plus.svg";
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

const MakePost = () => {
  const { id } = useParams();
  const { postMessage, setPostMessage, addPost } = usePostStore();

  const userAndClubDataFetch = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [clubDataFetch, userDataFetch] = await Promise.all([
      axios.get(`${API_URL}/api/club-joined/${id}`, { withCredentials: true }),
      axios.get(`${API_URL}/api/user`, { withCredentials: true }),
    ]);
    return {
      clubData: clubDataFetch.data.result,
      userData: userDataFetch.data.user,
    };
  };

  const { data, isLoading, isError } = useQuery(["userAndClubData", id], userAndClubDataFetch, {
    enabled: !!id,
  });
  if (isError) return <p className="text-red-500 dark:text-red-400">Error loading data. Please try again later.</p>;

  const { clubData, userData } = data || {};

  const images = {
    1: chess,
    2: book,
    3: art,
    4: science,
    5: music,
    6: drama,
    7: robot,
    8: debate,
    9: food,
    10: photo,
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (userData?.id && id) {
      await addPost(id, postMessage);
    } else {
      console.error("Missing userId or clubId");
    }
  };

  return (
    <div className="py-5 px-5 border-[1px] border-gray-300 shadow-sm w-full bg-white dark:bg-gray-900 items-center rounded-xl space-y-7 sticky top-20 mx-auto">
      <div className="flex space-x-2 justify-between w-full mx-auto max-h-60">
        <div className="flex space-x-3 items-center">
          <div className="rounded-full w-12 h-12 border-2 border-black dark:border-white flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <p className="text-2xl text-black dark:text-white font-bold">
              {userData?.firstname?.charAt(0).toUpperCase() || "U"}
            </p>
          </div>
          <div>
            <h3 className="capitalize font-medium text-black dark:text-white">
              {userData?.firstname} {userData?.lastname[0]}.
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{userData?.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="rounded-full border-2 border-black dark:border-white w-8 h-8 p-2">
            <img src={images[id]} alt="Club Icon" className="w-full h-full" />
          </div>
          <p className="text-sm capitalize text-black dark:text-white">
            {clubData?.[0]?.name || "Unknown Club"}
          </p>
        </div>
      </div>
      <div className="border-2 w-[95%] dark:bg-gray-800 rounded-2xl p-2 mx-auto dark:border-gray-800">
        <form onSubmit={handlePostSubmit} className="flex justify-between items-center">
          <textarea
            name="postMessage"
            placeholder="What's on your mind?"
            onChange={(e) => setPostMessage(e.target.value)}
            value={postMessage}
            className="w-[95%] focus:outline-none text-sm bg-white dark:bg-gray-800 text-black dark:text-white border-none resize-none p-1"
            rows="1"
          ></textarea>
          <button
            type="submit"
            className="bg-black dark:bg-gray-700 text-white rounded-full w-7 h-7 flex items-center justify-center"
          >
            <img src={plus} className="w-3 h-3" alt="Add Post" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakePost;