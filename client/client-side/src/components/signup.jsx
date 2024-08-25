
import React ,{useState} from "react";
import axios  from 'axios';


export default function signUp (){
    const [data,setData] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        passwordConfirmation:''

    });

    const handleCahnge= (e) =>{
        const {name , value} = e.target;
        setData({
            ...data, [name] : value
        });
    }
    const handleSubmit =async (e)=>{
        e.preventDefault(); // Prevent default form submission behavior
        try{
            const res = await axios.post('http://localhost:3001/api/register',data);
            console.log('succeded', res.json())
        }catch(err){

        }
    };

        return(
            <>
                <form onSubmit={handleSubmit}>
                    <div className="bg-black text-white flex flex-col gap-2 w-2/3 p-5 *:align-baseline ">
                        <div>
                            fistname: <input className="text-black" type="text" name="firstname" value={data.firstname} onChange={handleCahnge} required/>
                        </div>
                        <div>
                            lastname: <input className="text-black" type="text" name="lastname" value={data.lastname}  onChange={handleCahnge} required/>
                        </div>
                        <div>
                            email: <input className="text-black" type="text" name="email" value={data.email} onChange={handleCahnge} required/> </div>
                        <div>
                            password: <input className="text-black" type="password" name="password" value={data.password}  onChange={handleCahnge} required/>
                        </div>
                        <div>
                            confirm password: <input className="text-black" type="password" name="passwordConfirmation" value={data.passwordConfirmation} onChange={handleCahnge} required/>
                        </div>
                        <div>
                            <button type="submit" className="bg-white text-black uppercase font-mono p-2">register</button>
                        </div>
                    </div>
                   
                </form>
            </>
        )
}