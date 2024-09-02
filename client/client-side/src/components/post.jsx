 
import React from "react";
const Post = ({message , timestamp}) =>{
    return (
        <div className="p-5 flex flex-col gap-2  bg-[#1F2937]   rounded-md text-white shadow-md border-white  font-Rubik  h-auto overflow-hidden">
            <div className="p-2 text-md ">
            {message}
            </div>
            <p className="p-2 text-sm">{timestamp}</p>
        </div>
    )
}

export default Post;