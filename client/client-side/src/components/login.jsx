import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import Pic from '../assets/login.svg';

const LoginDialog = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const API_URL = import.meta.env.VITE_API_URL
      const res = await axios.post(`${API_URL}/api/login`, data);
      login(res.data.token);
      onClose();
      setData({});
    } catch (error) {
      console.error("Login failed:", error);
      setErr(error.response?.data?.msg || "An error occurred");
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-1110">
      <div className={`bg-cyan-600  rounded-lg shadow-lg w-full max-w-4xl h-[600px] flex justify-between  md:mx-0 transform transition-transform duration-3000 ease-in-out ${ isOpen ? 'translate-y-0 opacity-100 scale-100':'translate-y-10 opacity-0 scale-95'}`} >
        <div className='  flex flex-col  mr-auto ml-auto'>
          <img src={Pic} alt="Login" className="w-[15rem] h-1/2 mr-auto ml-auto " />
          <div className="flex flex-col mr-auto ml-auto   gap-2 border-white h-1/2 ">
                    <h1 className="text-white font-Jersey  font-medium capitalize text-[2.6rem] md:text-[3rem] lg:text-[2rem] mr-auto ml-auto text-center  ">wellcome to memebers only</h1>
                    <p className="text-white font-Rubik  md:text-[1rem] capitalize text-center ml-auto mr-auto">we are delighted for chosing our platform</p>
                    {/* <button className="border-white border-2 text-center hover:bg-slate-700 hover:text-white  text-white bg-cyan-600 w-[50%]  capitalize  font-Jersey text-xl h-12 p-2 rounded-xl shadow-md mr-auto ml-auto"   ><NavLink to={'/wellcome'}>back to home</NavLink></button> */}
                
                </div>
        </div>

        <div className='bg-orange-400 w-[50%] rounded-r-lg shadow-md mr-2 mt-2 mb-2 '>
        <div className='text-right'>
            <button
              type="button"
              onClick={onClose}
              className="bg-orange-400 text-white   font-bold py-2 px-4 rounded w-fit text-2xl -auto"
            >
              x
            </button>
            </div>
            <form onSubmit={handleSubmit} className="  p-10">
            
            <h1 className=" font-normal font-Bebas-Neue mb-2 text-center text-4xl text-white">Login</h1>
    
    
    
              <div  className='mb-4'>
    
                <label htmlFor="email" className="block text-sm font-new-amsterdam font-normal text-white">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="text-black  text-2 h-12 rounded-md border-slate-600 border-[1px] shadow-sm w-[100%] p-4 placeholder:text-slate-500" placeholder="avcs@xyz.com"                   required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-new-amsterdam font-normal text-white">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="text-black  text-2 h-12 rounded-md border-slate-600 border-[1px] shadow-sm w-[100%] p-4 placeholder:text-slate-500" placeholder="••••••••"
                  required
                />
              </div>
              
              {err && <p className="text-red-400 text-sm mb-4">{err}</p>}
              
              <div className="flex flex-col gap-4 justify-end">
               
                <button
                  type="submit"
                  className="bg-cyan-600  hover:bg-blue-600 text-white font-new-amsterdam font-normal text-xl py-2 px-4 rounded-md shadow-sm border-2 border-white"
                >
                  Login
                </button>
                <p className='text-center text-white text-lg capitalize'>have no account?</p>
              </div>
            </form>
          </div>
        </div>
       
        </div>
       
  );
};

export default LoginDialog;
