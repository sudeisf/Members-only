import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';

const LoginDialog = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      setData({ email: '', password: '' });
    } catch (error) {
      console.error('Login failed:', error);
      setErr(error.response?.data?.msg || 'An error occurred');
      setInterval(() => {
        setErr('');
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] z-50">
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
              className="peer placeholder-transparent h-10 w-full border-b border-gray-300 text-black dark:text-white focus:outline-none  focus:border-white bg-[#ffffff00]"
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
              className="peer placeholder-transparent h-10 w-full border-b border-gray-300 text-black dark:text-white focus:outline-none focus:border-white bg-[#ffffff00]"
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
          {err && <p className="text-red-400 text-sm mt-4">{err}</p>}
          <button
            type="submit"
            className="bg-[#000000d7] dark:bg-[#0d9489af] text-white text-xl py-2 px-4 rounded-md mt-6 shadow-sm w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;
