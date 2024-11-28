 
import React from "react";
const Post = ({message , timestamp}) =>{
    return (
        <div className="p-5 flex flex-col gap-2 text-[.8rem]  border dark:border-none bg-white dark:bg-[#1F2937]   rounded-[15px] text-black dark:text-white shadow-sm   3xl:max-w-[65%]  2xl:ml-auto w-full font-Rubik  h-auto overflow-hidden">
            <div className="p-2 text-md ">
            {message}
            </div>
            <p className="p-2 text-sm">{timestamp}</p>
        </div>
    )
}

export default Post;