import React, { useState } from "react";
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";


export default function SignUp({ isOpen, onClose }) {
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });
    const [err, setErr] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
        setErr({ ...err, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        axios.defaults.withCredentials = true;
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            console.log('API URL:', API_URL);
            const res = await axios.post(`${API_URL}/api/register`, data);
          
            setErr({});
            if (res.data.success) {
                onClose();
                navigate('/register/login');
            }
        } catch (err) {
            if (err.response && err.response.data.errors) {
                console.error('Error response:', err.response.data);
                const validationErr = err.response.data.errors;
                const errObj = {};
                validationErr.forEach(error => {
                    errObj[error.path] = error.msg;
                });
                setErr(errObj);
            } else if (err.request) {
                console.error('Error request:', err.request);
            } else {
                console.error("Login failed:", error);
                setErr(err.response?.data?.msg || "An error occurred");
            }
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm  z-40">
                <div className="dark:bg-[#111827] bg-white flex-col rounded-lg shadow-lg  w-[28rem] max-w-4xl  flex border-[#9c9a9a52] border  px-5 ">
                <div className='text-right'>
                            <button
                            type="button"
                            onClick={onClose}
                            className=" dark:text-white text-black font-bold  px-4 rounded w-fit text-2xl "
                            >
                            x
                            </button>
                        </div>

                        <form className=" w-[90%] ml-auto mr-auto h-fit *:font-Rubik" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2 h-1/2 ">
                                <h1 className="text-center font-medium font-new-amsterdam dark:text-white text-black text-3xl capitalize">Sign Up</h1>
                                <div>
                                    <label className="block font-medium dark:text-white text-black">First Name</label>
                                    <input
                                        className="w-full py-3  bg-white dark:bg-[#111827] text-black dark:text-white border-b border-[#9c9a9a52]  focus-within:outline-none"
                                        placeholder="First Name"
                                        type="text"
                                        name="firstname"
                                        value={data.firstname}
                                        onChange={handleChange}
                                        required
                                    />
                                    {err.firstname && <p className="text-red-600 text-sm">{err.firstname}</p>}
                                </div>
                                <div>
                                    <label className="block font-medium text-black dark:text-white">Last Name</label>
                                    <input
                                        className="w-full py-3    bg-white dark:bg-[#111827] text-black  border-b border-[#9c9a9a52] dark:text-white focus-within:outline-none"
                                        placeholder="Last Name"
                                        type="text"
                                        name="lastname"
                                        value={data.lastname}
                                        onChange={handleChange}
                                        required
                                    />
                                    {err.lastname && <p className="text-red-600 text-sm">{err.lastname}</p>}
                                </div>
                                <div>
                                    <label className="block font-medium text-black dark:text-white">Email</label>
                                    <input
                                        className="w-full py-3   bg-white dark:bg-[#111827]  border-b border-[#9c9a9a52] dark:text-white text-black focus-within:outline-none"
                                        placeholder="example@domain.com"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {err.email && <p className="text-red-600 text-sm">{err.email}</p>}
                                </div>
                                <div>
                                    <label className="block font-medium text-black dark:text-white">Password</label>
                                    <input
                                        className="w-full py-3   bg-white dark:bg-[#111827]   border-b border-[#9c9a9a52] dark:text-white text-black focus-within:outline-none"
                                        placeholder="••••••••"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    {err.password && <p className="text-red-600 text-sm">{err.password}</p>}
                                </div>
                                <div>
                                <label className="block font-medium text-black dark:text-white">Confirm Password</label>
                                    <input
                                        className="w-full py-3   bg-white dark:bg-[#111827]  border-b border-[#9c9a9a52] dark:text-white text-black focus-within:outline-none"
                                        placeholder="••••••••"
                                        type="password"
                                        name="passwordConfirmation"
                                        value={data.passwordConfirmation}
                                        onChange={handleChange}
                                        required
                                    />
                                    {err.passwordConfirmation && <p className="text-red-600 text-sm">{err.passwordConfirmation}</p>}
                                </div>
                                  <div className="mt-2">
                                    <button type="submit" className="w-full bg-black p-3 dark:bg-[#0D9488] text-white rounded-md hover:bg-slate-600">
                                        Register
                                    </button>
                                    <p className="text-center mt-2">
                                        <NavLink to="#" className={" font-Rubik text-white"}>Already have an account?</NavLink>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            
        </>
    );
}
