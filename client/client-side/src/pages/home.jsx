import heroPic from '../assets/hero.jpg';
import LogIn from '../components/login';
import { useAuth } from '../Context/AuthContext';
import Posts from './posts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Club from '../components/club';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const {login} = useAuth();
    const navigate = useNavigate();
    const [data,setData] = useState({
        email:'',
        password:'',

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
        e.preventDefault(); 
        try {
            const res = await axios.post('http://localhost:3001/api/login', data);
            console.log('Success:', res.data);  
            
             login(res.data.token);
             navigate('/home')
            setErr({})
        } catch (err) {
            
        }
    };
  
  return (
    <>
    {
        isAuthenticated &&
        <div>
        <div>
        
        <div className="bg-cyan-600 flex md:h-[43rem] h-[80vh]  border-slate-300">
          <div className="w-[60%] mr-auto ml-auto text-center align-middle mb-auto mt-auto md:p-5 flex flex-col gap-5">
            <h1 className="font-Jersey uppercase text-[3rem] md:text-[5rem] text-center text-slate-50 drop-shadow-xl ">
              Welcome to Members Only
            </h1>
            <p className="text-slate-100 md:text-md font-Rubik font-normal   md:text-left text-wrap text-justify">
              The "Members Only" project is a web application designed to provide exclusive access to content and features for registered users.
              At its core, the project emphasizes the importance of authentication and authorization, 
              ensuring that only authenticated users can view or interact with certain sections of the site. 
              
            </p>
            <div>
              <button className=" bg-orange-400 mt-3 border-white border-2  text-center hover:bg-cyan-600  text-white w-[50%] capitalize font-Bebas-Neue md:text-xl h-12 p-2 rounded-xl  drop-shadow-xl  ml-auto mr-auto">
                Explore More
              </button>
            </div>
          </div>
        </div>
    </div>
    <div className='flex gap-3 px-40'>
          <Posts />
          <Club />
    </div>

    </div>


     
    }
     
           
    </>
  );
};

export default Home;
