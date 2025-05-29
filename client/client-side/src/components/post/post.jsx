import { parseISO, format } from "date-fns";

import art from "../../assets/club-icons/art.svg";
import book from "../../assets/club-icons/book.svg";
import chess from "../../assets/club-icons/chess.svg";
import debate from "../../assets/club-icons/debate.svg";
import drama from "../../assets/club-icons/drama.svg";
import food from "../../assets/club-icons/food.svg";
import music from "../../assets/club-icons/music.svg";
import photo from "../../assets/club-icons/photo.svg";
import robot from "../../assets/club-icons/robot.svg";
import science from "../../assets/club-icons/science.svg";

const Post = ({ data }) => {



  let formattedDate = "Unknown Date";
  if (data.sent_at) {
    try {
      const parsedDate = parseISO(data.sent_at);
      formattedDate = format(parsedDate, "MMM d, yyyy");
    } catch (error) {
      console.error("Error parsing date:", error, "sent_at:", data.sent_at);
    }
  }

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

  const txtlength = (message) => {
    if (message && message.length > 150) {
      return message.slice(0, 150) + "...";
    }
    return message || "No content";
  };

  const clubId = data.club_id;
  const clubIcon = images[clubId] ||  images[data.id];

  return (
    <div className="flex flex-col gap-3 p-6 border dark:border-gray-700 bg-white dark:bg-[#1F2937] rounded-2xl shadow-xs transition-all duration-300 ease-in-out hover:shadow-xl w-full max-w-2xl mx-auto max-h-fit">
      <div className="flex items-center justify-between pb-3 border-gray-300 dark:border-gray-600">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-black dark:text-white border-2 text-lg font-bold shadow-sm">
            {data.firstname ? data.firstname[0] : "U"}
          </div>
          <div>
            <p className="text-lg font-semibold capitalize dark:text-white">
              {data.firstname || "Unknown"} {data.lastname || ""}
            </p>
            <p className="text-sm text-gray-500 dark:text-white">{data.email || "No email"}</p>
            <p className="text-sm text-gray-400">{formattedDate}</p>
          </div>
        </div>
      </div>
      <div className="text-gray-700 dark:text-gray-300 text-md leading-relaxed">
        {txtlength(data.message_content || data.content)}
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-700">
          <img src={clubIcon} alt="Club Icon" className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {data.club_name || "Unknown Club"}
        </p>
      </div>
    </div>
  );
};

export default Post;