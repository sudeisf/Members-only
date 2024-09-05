import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import pic from '../assets/login.svg';

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
            console.log('Success:', res.data); // Use res.data to access the response data
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
            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-70 z-40">
                <div className="bg-cyan-600 rounded-lg shadow-lg w-full max-w-4xl h-[700px] flex justify-between p-2">
                    <div className="flex flex-col mr-auto ml-auto">
                        <img src={pic} alt="Login" className="w-[16rem] h-2/5 mx-auto" />
                        <div className="flex flex-col mx-auto gap-2 text-center">
                            <h1 className="text-white font-medium  text-[2.6rem] md:text-[3rem] lg:text-[2.5rem] font-Jersey">Welcome to Members Only</h1>
                            <p className="text-white md:text-[1rem] font-Rubiks">We are delighted that you chose our platform</p>
                        </div>
                    </div>

                    <div className="bg-gray-100 w-[50%] h-auto rounded-lg shadow-md p-1">
                        <div className="text-right">
                            <button 
                                type="button"
                                onClick={onClose}
                                className="text-black  font-bold py-2 px-4 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <form className=" w-[90%] ml-auto mr-auto h-fit *:font-Rubik" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2 h-1/2 ">
                                <h1 className="text-center font-medium font-new-amsterdam text-cyan-600 text-3xl capitalize">Sign Up</h1>
                                <div>
                                    <label className="block font-medium text-cyan-600">First Name</label>
                                    <input
                                        className="w-full p-3 border-2 border-cyan-600 rounded-md mt-2"
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
                                    <label className="block font-medium text-cyan-600">Last Name</label>
                                    <input
                                        className="w-full p-3 border-2 border-cyan-600 rounded-md mt-2"
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
                                    <label className="block font-medium text-cyan-600">Email</label>
                                    <input
                                        className="w-full p-3 border-2 border-cyan-600 rounded-md mt-2"
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
                                    <label className="block font-medium text-cyan-600">Password</label>
                                    <input
                                        className="w-full p-3 border-2 border-cyan-600 rounded-md mt-2"
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
                                    <label className="block font-medium text-cyan-600">Confirm Password</label>
                                    <input
                                        className="w-full p-3 border-2 border-cyan-600 rounded-md mt-2"
                                        placeholder="••••••••"
                                        type="password"
                                        name="passwordConfirmation"
                                        value={data.passwordConfirmation}
                                        onChange={handleChange}
                                        required
                                    />
                                    {err.passwordConfirmation && <p className="text-red-600 text-sm">{err.passwordConfirmation}</p>}
                                </div>
                      <div className="">
                                    <button type="submit" className="w-full p-3 bg-cyan-600 text-white rounded-md hover:bg-slate-600">
                                        Register
                                    </button>
                                    {/* <p className="text-center mt-2">
                                        <a href="#" className=" font-Rubik font-Bebas-Neue text-black">Already have an account?</a>
                                    </p> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
