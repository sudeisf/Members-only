import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
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
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] z-50">
      <div className="bg-[#111827] rounded-xl w-[30rem] max-w-4xl h-[500px] flex flex-col justify-center transform transition-transform duration-300 ease-in border border-[#9c9a9a52]">
        <div className="text-right">
          <button
            type="button"
            onClick={onClose}
            className="text-white font-bold px-4 rounded w-fit text-2xl"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="w-2/3 mx-auto">
          <h1 className="font-Bebas-Neue text-3xl text-white text-center mb-6">
            Welcome
          </h1>
          <div className="relative mt-4">
            <input
              autoComplete="off"
              id="email"
              name="email"
              type="email"
              className="peer placeholder-transparent h-10 w-full border-b border-gray-300 text-gray-200 focus:outline-none focus:border-rose-600 bg-[#111827]"
              placeholder="abc@gmail.com"
              value={data.email}
              onChange={handleChange}
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-white peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-200"
            >
              Email
            </label>
          </div>
          <div className="relative mt-6">
            <input
              autoComplete="off"
              id="password"
              name="password"
              type="password"
              className="peer placeholder-transparent h-10 w-full border-b border-gray-300 text-gray-200 focus:outline-none focus:border-rose-600 bg-[#111827]"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-white peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-200"
            >
              Password
            </label>
          </div>
          {err && <p className="text-red-400 text-sm mt-4">{err}</p>}
          <button
            type="submit"
            className="bg-[#0D9488] hover:bg-[#0d9489af] text-white text-xl py-2 px-4 rounded-md mt-6 shadow-sm w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;
