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
    axios.defaults.withCredentials = true;
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      console.log('API URL:', API_URL);
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
    <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-50">
      <div className={`bg-[#111827] rounded-xl w-[30rem] gap-5 max-w-4xl h-[500px] flex flex-col  md:mx-0 transform transition-transform duration-3000 ease-in  border-x border-y border-[#9c9a9a52]  ${isOpen ? 'translate-y-0 opacity-100 scale-80' : 'translate-y-10 opacity-0 scale-65'}`}>
        {/* <div className='flex flex-col mr-auto ml-auto'>
          <img src={Pic} alt="Login" className="w-[15rem] h-1/2 mr-auto ml-auto " />
          <div className="flex flex-col mr-auto ml-auto gap-2 border-white h-1/2 ">
            <h1 className="text-white font-Jersey font-medium capitalize text-[2.6rem] md:text-[3rem] lg:text-[2rem] mr-auto ml-auto text-center">Welcome to Members Only</h1>
            <p className="text-white font-Rubik md:text-[1rem] capitalize text-center ml-auto mr-auto">We are delighted for choosing our platform</p>
          </div>
        </div> */}

          <div className='text-right'>
            <button
              type="button"
              onClick={onClose}
              className=" text-white font-bold  px-4 rounded w-fit text-2xl -auto"
            >
              x
            </button>
          </div>
          <form onSubmit={handleSubmit} className="w-2/3 ml-auto mr-auto">
            <h1 className="font-normal font-Bebas-Neue mb-2 text-center text-3xl text-white">wellcome</h1>
            <div className='flex flex-col gap-2 pb-4'>
              <label htmlFor="email" className="block text-md font-Rubik font-normal text-white">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                // style={'::autofill:'}
                className="text-white text-2 h-12  border-b shadow-sm w-[100%] py-4 px-2 placeholder:text-white bg-[#111827] focus-within:outline-none border-[#9c9a9a52] autofill:bg-[#111827]" placeholder="avcs@xyz.com"
                required
              />
            </div>

            <div className='flex flex-col gap-2 pb-4'>
              <label htmlFor="password" className="block text-md font-Rubik font-normal text-white">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="text-white text-2  border-b shadow-sm w-[100%] py-4 px-2 placeholder:text-white bg-[#111827] focus-within:outline-none border-[#9c9a9a52]" placeholder="••••••••"
                required
              />
            </div>

            {err && <p className="text-red-400 text-sm mb-4">{err}</p>}

            <div className="flex flex-col gap-4 justify-end mt-4">
              <button
                type="submit"
                className="bg-[#0D9488] hover:bg-[#0d9489af] text-white font-new-amsterdam font-normal text-xl py-2 px-4 rounded-md shadow-sm "
              >
                Login
              </button>
              <p className='text-center text-white text-lg '>Have no account?</p>
            </div>
          </form>
        </div>
      </div>
    
  );
};

export default LoginDialog;
