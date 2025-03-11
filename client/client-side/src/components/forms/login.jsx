import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import Alert from './alert';
import { useEffect } from 'react';
import {ClipLoader} from "react-spinners"
import { useNavigate } from 'react-router-dom';


const LoginDialog = ({ isOpen, onClose }) => {
  const [isloading , setLoading] = useState(null)
  const {checkAuth} = useAuth();

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setData({ email: "", password: "" }); 
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios.defaults.withCredentials = true;
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      console.log("API URL:", API_URL);
      const res = await axios.post(`${API_URL}/api/login`, data , { withCredentials: true });
      if (res.status === 200) {
        await checkAuth(); 
        onClose();
        navigate("/");
        setData({ email: "", password: "" });
        setErr(""); // Clear error on successful login
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErr(error.response?.data?.msg || "An error occurred");
      setTimeout(() => setErr(""), 5000);
      if (error.response?.data?.type === "password") {
        setData((prev) => ({ ...prev, password: "" }));
      } else if (error.response?.data?.type === "user") {
        setData((prev) => ({ ...prev, email: "" }));
      }
    } finally {
      setLoading(false);
    }
};

if (!isOpen) { // Reset form state
  return null; // Prevent rendering anything
}

  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] z-50">
       {err && <Alert message={err} onClose={() => setErr("")} />}
      <div className="dark:bg-[#111827] bg-[#ffffff]  rounded-xl w-[30rem] max-w-4xl h-[500px] border-1  flex flex-col  transform transition-transform duration-300 ease-in border border-[#9c9a9a52]">
        <div className="text-right">
          <button
            type="button"
            onClick={onClose}
            className="dark:text-white py-2 text-black font-bold px-4 rounded w-fit text-2xl"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="w-3/5 mx-auto flex flex-col items-center h-full">
          <h1 className="font-Rubik uppercase text-3xl pt-8 font-medium text-black dark:text-white text-center mb-6">
            Welcome
          </h1>
          <div className="relative mt-4 w-full">
            <input
              autoComplete="off"
              id="email"
              name="email"
              type="email"
              className="peer placeholder-transparent h-10 w-full border-b border-gray-300 text-black dark:text-white focus:outline-none focus:border-black  dark:focus:border-white bg-[#ffffff00]"
              placeholder="abc@gmail.com"
              value={data.email}
              onChange={handleChange}
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 dark:peer-placeholder-shown:text-white peer-placeholder-shown:text-black peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-600"
            >
              Email
            </label>
          </div>
          <div className="relative mt-6 w-full">
            <input
              autoComplete="off"
              id="password"
              name="password"
              type="password"
              className="peer placeholder-transparent h-10 w-full border-b border-gray-300 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white bg-[#ffffff00]"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
             <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 dark:peer-placeholder-shown:text-white peer-placeholder-shown:text-black peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-600"
            >
              Password
            </label>
          </div>
          
          <button
            type="submit"
            className="bg-[#000000d7] dark:bg-[#0d9489af] text-white text-xl py-2 px-4 rounded-md mt-6 shadow-sm w-full"
          >
            {isloading ? <ClipLoader color="#ffffff" size={15} />: "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;
