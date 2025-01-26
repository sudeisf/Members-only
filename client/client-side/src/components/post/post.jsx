 
import React from "react";
import options from '../../assets/options-svgrepo-com.svg'
import { useState } from "react";

import moment from "moment";

import art from '../../assets/club-icons/art.svg'
import book from '../../assets/club-icons/book.svg'
import chess from '../../assets/club-icons/chess.svg'
import debate from '../../assets/club-icons/debate.svg'
import drama from '../../assets/club-icons/drama.svg'
import food from '../../assets/club-icons/food.svg'
import music from '../../assets/club-icons/music.svg'
import photo from '../../assets/club-icons/photo.svg'
import robot from '../../assets/club-icons/robot.svg'
import science from '../../assets/club-icons/science.svg'
import { parseISO, format } from "date-fns";


const Post = ({data}) =>{

    const [open , setOpen] = useState(false);

    const isoDate = data.sent_at; 
    const parsedDate = parseISO(isoDate); // Parses the ISO timestamp
    const formattedDate = format(parsedDate, "MMM d, yyyy");
    console.log(data.timestamp); // Check what is being passed



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

      const txtlength =  message =>{
        if(message.length > 150){
          return message.slice(0, 150) + "...";
        }
        return message
      }
     

    return (
        <div className="flex flex-col gap-2 md:text-[.8rem] overflow-visible justify-between border-2 border-gray-800 dark:border-none bg-white dark:bg-[#1F2937] p-5 rounded-[15px] text-black dark:text-white shadow-sm   w-full  2xl:ml-auto  mx-auto font-Rubik  h-fit ">
            
                <div id="avatar-info" className="flex justify-between md:p-5 items-start  border-b">
                    <div id="avatar" className="flex gap-3">
                        <div className="rounded-[50%] w-10 h-10 border-2 border-black dark:bg-white text-center flex items-center ">
                        {/* <img src={data.profilePicture} alt="" className="w-[3rem] h-[3rem] rounded-full" />
                         */}
                         <p className='items-center text-xl text-black dark:text-white mx-auto font-new-amsterdam'>
                             {data.firstname[0]}
                         </p>
                        </div>
                        <div id="user-info pt-1">
                            <p className=" text-md font-lg  capitalize">{data.firstname} {data.lastname}.</p>
                            <p className=" text-sm text-[#757678]">{data.email}</p>
                            <p className=" text-sm text-[#757678]">{formattedDate}</p>
                        </div>
                    </div>

                        

                        <div id="option-info" className="relative overflow-visible">
                            <img src={options} className="w-[1rem] h-[1rem]" alt="" onClick={() => setOpen(!open)} />
                            <div
                                className={`absolute top-[1.5rem] left-0 flex-col gap-2 text-auto bg-[#eeefef] w-[6rem] rounded-lg transition-all duration-200 ease-in-out text-black 
                                transform ${open ? 'opacity-100 scale-100 flex' : 'opacity-0 scale-95 hidden'}`}
                                >
                                <p className="border-b p-2 hover:bg-[#e0e0e0]">option 1</p>
                                <p className="p-2 hover:bg-[#e0e0e0]">option 2</p>
                            </div>
                        </div> 
                </div>

                <div id="post-info" className="py-1">
                    <p className="text-justify text-xsm  md:text-[1rem] font-normal md:p-4 text-[#5e5f60] dark:text-white px-5  rounded-tl-lg">{data.message_content}</p>
                </div>

                <div id="club-name" className="flex gap-2 items-center  py-1 ">
                    <div className=" w-[2rem] h-[2rem] rounded-full border-2 border-black p-2 items-center flex ">
                      <img src={images[data.id]} alt="" className="w-[1.5rem] h-[1.5rem]" />
                    </div>
                    <p>{data.club_name}</p> 
                </div>
        </div>
    )
}

export default Post;