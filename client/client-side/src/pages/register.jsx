

import React ,{useState} from "react";
import axios  from 'axios';
import { postData } from "../services/rigesterApi";
import { Outlet } from "react-router-dom";


export default function Register (){
    const [data,setData] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        passwordConfirmation:''

    });
    const [err, setErr] = useState({})

    const handleCahnge= (e) =>{
        const {name , value} = e.target;
        setData({
            ...data, [name] : value
        });
        setErr({...err,[name]:''});
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const res = await axios.post('http://localhost:3001/api/register', data);
            console.log('Success:', res.data);  // Use res.data to access the response data
            setErr({})
        } catch (err) {
            if (err.response && err.response.data.errors) {
                console.error('Error response:', err.response.data);
                const  vlaidationErr = err.response.data.errors;
                const  errObj = {};
                vlaidationErr.forEach(error=>{
                    errObj[error.path] = error.msg;
                });
                setErr(errObj);
                console.error('Error response:', err.response.data);
            } else if (err.request) {
               
                console.error('Error request:', err.request);
            } else {
               
                console.error('Error:', err.message);
            }
        }
    };

        return(
            <>
            <div className=" bg-slate-100 gap-2 flex flex-wrap-reverse md:flex-nowrap  md:h-[600px] mt-auto mb-auto  ">
                <div className="md:h-fit h-[100vh]  w-[100%] mt-auto mb-auto  md:w-[50%] md:mt-[auto] md:mb-auto">
                <div className="flex flex-col mr-auto ml-auto mt-[50%] md:mt-auto md:mb-auto gap-2 md:border-r-2 border-slate-500  ">
                    <h1 className="text-black font-Jersey  font-medium capitalize text-[2.6rem] md:text-[3rem] lg:text-[4.6rem] mr-auto ml-auto text-center w-[80%] ">wellcome to memebers only</h1>
                    <p className="text-slate-800 font-Jersey w-[50%] md:text-[1.3rem] capitalize text-center ml-auto mr-auto">we are delighted for chosing our platform</p>
                    <button className="border-black border-2 text-center hover:bg-slate-700 hover:text-white  text-black w-[50%]  capitalize  font-Jersey text-xl h-12 p-2 rounded-xl shadow-md mr-auto ml-auto"   >back to home    </button>
                
                </div>
                </div>
                
                    <Outlet />
                
            </div>
             
            </>
        )
}