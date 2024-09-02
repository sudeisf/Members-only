

import React ,{useState} from "react";
import axios  from 'axios';
// import { postData } from "../services/rigesterApi";
import { NavLink, Outlet } from "react-router-dom";


export default function Register (){
   
        return(
            <>
            <div className=" bg-orange-400 gap-2 flex flex-wrap-reverse md:flex-nowrap  md:h-[100vh] mt-auto mb-auto  ">
                <div className="md:h-fit h-[100vh]  w-[100%] mt-auto mb-auto  md:w-[50%] md:mt-[auto] md:mb-auto">
                <div className="flex flex-col mr-auto ml-auto mt-[50%] md:mt-auto md:mb-auto gap-2 md:border-r-2 border-white  ">
                    <h1 className="text-white font-Jersey  font-medium capitalize text-[2.6rem] md:text-[3rem] lg:text-[4.6rem] mr-auto ml-auto text-center w-[80%] ">wellcome to memebers only</h1>
                    <p className="text-white font-Jersey w-[50%] md:text-[1.3rem] capitalize text-center ml-auto mr-auto">we are delighted for chosing our platform</p>
                    <button className="border-white border-2 text-center hover:bg-slate-700 hover:text-white  text-white bg-cyan-600 w-[50%]  capitalize  font-Jersey text-xl h-12 p-2 rounded-xl shadow-md mr-auto ml-auto"   ><NavLink to={'/wellcome'}>back to home</NavLink></button>
                
                </div>
                </div>
                
                    <Outlet />
                
            </div>
             
            </>
        )
}