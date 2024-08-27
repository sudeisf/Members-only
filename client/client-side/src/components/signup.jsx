
import React ,{useState} from "react";
import axios  from 'axios';
import { postData } from "../services/rigesterApi";


export default function SignUp (){
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
            
               
            <form className="w-[80%] md:w-[50%] h-[100vh] md:h-full mt-[20%] md:mt-auto mb-auto mr-auto ml-auto" onSubmit={handleSubmit}>
                    <div className="text-black  flex flex-col  gap-1 p-3 sm:p-4 md:p-1 lg:p-5  align-middle   *:capitalize mr-auto ml-auto  md:w-[75%] xl:w-[60%] ">
                        <div>
                            <h1 className="text-center font-new-amsterdam font-medium text-3xl capitalize">Sign up</h1>
                        </div>
                        <div className="*:text-lg flex flex-col gap-3">
                            <div className="font-new-amsterdam font-medium">fistname </div>
                            <input className="text-black  text-2 h-12 rounded-md border-slate-600 border-[1px] shadow-sm w-[100%] focus:shadow-outline p-4 placeholder:text-slate-500" placeholder="first name"  type="text" name="firstname" value={data.firstname} onChange={handleCahnge} required/>
                            {err.firstname && <p className=" font-sans text-[2px] text-[red]">{err.firstname}</p> }
                        </div>
                        <div className="*:text-lg flex flex-col gap-3">
                            <div className="font-new-amsterdam font-medium">lastname</div>
                            <input className="text-black  text-2 h-12 rounded-md border-slate-600 border-[1px] shadow-sm w-[100%] p-4 placeholder:text-slate-500" placeholder="last name" type="text" name="lastname" value={data.lastname}  onChange={handleCahnge} required/>
                            {err.lastname && <p className=" font-sans text-[2px] text-[red]">{err.lastname}</p> }
                        </div>
                        <div className="*:text-lg flex flex-col gap-3">
                            <div className="font-new-amsterdam font-medium">email</div>
                             <input className="text-black  text-2 h-12 rounded-md border-slate-600 border-[1px] shadow-sm w-[100%] p-4 placeholder:text-slate-500" placeholder="avcs@xyz.com" type="email" name="email" value={data.email} onChange={handleCahnge} required/> </div>
                             {err.email && <p className=" font-sans text-[2px] text-[red]">{err.email}</p> }
                        <div className="*:text-lg flex flex-col gap-3">
                            <div className="font-new-amsterdam font-medium">password</div>
                             <input className="text-black  text-2 h-12 rounded-md border-slate-600 border-[1px] shadow-sm w-[100%] p-4 placeholder:text-slate-500" placeholder="••••••••" type="password" name="password" value={data.password}  onChange={handleCahnge} required/>
                             {err.password && <p className=" font-sans text-[2px] text-[red]">{err.password}</p> }
                        </div>
                        <div className="*:text-lg flex flex-col gap-3">
                            <div className="font-new-amsterdam font-medium">confirm password</div>
                             <input className="text-black  text-2 h-12 rounded-md border-slate-600 border-[1px] shadow-sm w-[100%] p-4 placeholder:text-slate-500 placeholder:text-[1rem]" placeholder="••••••••"  type="password" name="passwordConfirmation" value={data.passwordConfirmation} onChange={handleCahnge} required/>
                            {err.passwordConfirmation && <p className=" font-sans text-[2px] text-[red]">{err.passwordConfirmation}</p> }
                        </div>

                        <div className="flex flex-col justify-center mt-2 gap-1" >
                            <button type="submit" className="bg-slate-800 hover:bg-slate-600 hover:outline-8 hover:border-2  text-white text-xl  capitalize items-center font-Jersey h-12 p-2 font-normal rounded-xl  shadow-sm w-[100%]">register</button>
                            <p className="appearance-none text-center"><a href="" className="text-slate-500 font-semibold  ">aleardy have an account ?</a></p>
                        </div>
                    </div>
                   
                </form>
        
             
            </>
        )
}