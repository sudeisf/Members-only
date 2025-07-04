import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios';
import Alert from './alert';
import { useEffect } from 'react';
import {ClipLoader} from "react-spinners"
import { useNavigate } from 'react-router-dom';


const LoginDialog = ({ isOpen, onClose }) => {
  const { login, checkAuth, loading } = useAuthStore();
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
    try {
      const result = await login(data);
      if (result.success) {
        await checkAuth();
        onClose();
        navigate("/");
        setData({ email: "", password: "" });
        setErr("");
      } else {
        setErr(result.error);
        setTimeout(() => setErr(""), 5000);
        if (result.type === "password") {
          setData((prev) => ({ ...prev, password: "" }));
        } else if (result.type === "user") {
          setData((prev) => ({ ...prev, email: "" }));
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErr("An unexpected error occurred");
      setTimeout(() => setErr(""), 5000);
    }
  };

if (!isOpen) { 
  return null;
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
              className="peer h-10 w-full border-b border-gray-300 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white bg-[#ffffff00] [&:-webkit-autofill]:bg-[#ffffff00] [&:-webkit-autofill]:dark:bg-[#111827] [&:-webkit-autofill]:shadow-[0_0_0_1000px_#ffffff_inset] dark:[&:-webkit-autofill]:shadow-[0_0_0_1000px_#111827_inset] [&:-webkit-autofill]:!text-black dark:[&:-webkit-autofill]:!text-white [&::placeholder]:opacity-0"
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
              className="peer h-10 w-full border-b border-gray-300 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white bg-[#ffffff00] [&:-webkit-autofill]:bg-[#ffffff00] [&:-webkit-autofill]:dark:bg-[#111827] [&:-webkit-autofill]:shadow-[0_0_0_1000px_#ffffff_inset] dark:[&:-webkit-autofill]:shadow-[0_0_0_1000px_#111827_inset] [&:-webkit-autofill]:!text-black dark:[&:-webkit-autofill]:!text-white [&::placeholder]:opacity-0"
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
            {loading ? <ClipLoader color="#ffffff" size={15} /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;
