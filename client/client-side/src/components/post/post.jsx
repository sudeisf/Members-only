import React, { useState } from "react";
import options from "../../assets/options-svgrepo-com.svg";
import moment from "moment";
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
  const [open, setOpen] = useState(false);

  const isoDate = data.sent_at;
  const parsedDate = parseISO(isoDate);
  const formattedDate = format(parsedDate, "MMM d, yyyy");

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
    if (message.length > 150) {
      return message.slice(0, 150) + "...";
    }
    return message;
  };

  return (
    <div className="flex flex-col gap-3 p-6 border  dark:border-gray-700 bg-white dark:bg-[#1F2937] rounded-2xl shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl w-full max-w-2xl mx-auto max-h-fit">
      {/* Avatar & User Info */}
      <div className="flex items-center justify-between pb-3  border-gray-300 dark:border-gray-600">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full  text-black dark:text-white border-2 text-lg font-bold shadow-sm">
            {data.firstname[0]}
          </div>
          <div>
            <p className="text-lg font-semibold capitalizee dark:text-white">{data.firstname} {data.lastname}</p>
            <p className="text-sm text-gray-500 dark:text-white">{data.email}</p>
            <p className="text-sm text-gray-400">{formattedDate}</p>
          </div>
        </div>

      
      </div>

      {/* Post Content */}
      <div className="text-gray-700 dark:text-gray-300 text-md leading-relaxed px-2">
        {txtlength(data.message_content)}
      </div>

      {/* Club Icon & Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 shadow-sm">
          <img src={images[data.id]} alt="" className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{data.club_name}</p>
      </div>
    </div>
  );
};

export default Post;
