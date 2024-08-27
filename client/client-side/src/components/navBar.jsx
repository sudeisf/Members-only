
import { NavLink } from "react-router-dom";


const NavBar = () =>{
    return(
        <>
          <nav className="bg-slate-100 w-full flex flex-row justify-between p-3  border-b-2 border-slate-300 items-center">
            <div>
                <p className="font-new-amsterdam text-[1.5rem] ml-3 uppercase">members-only</p>
            </div>
            <div className="md:flex flex-row gap-4 hidden " >
                <NavLink to={'/home'} className='font-new-amsterdam uppercase text-[1.3rem]'>home</NavLink>
                <NavLink  className='font-new-amsterdam uppercase text-[1.3rem]'>club</NavLink>
                <NavLink  className='font-new-amsterdam uppercase text-[1.3rem] '>posts</NavLink>
                <NavLink  className='font-new-amsterdam uppercase text-[1.3rem]'>contact</NavLink>

            </div>
            <div className="flex gap-3">
            <NavLink to ={'/register/signup'} className={({isActive})=>{
                return isActive ? 'invisible' : ''
            }}><button  className="bg-slate-800 text-white font-new-amsterdam px-3 rounded-md shadow-md py-1 ">
                sign up
            </button></NavLink>

                
            <NavLink to ={'/register/login'} className={({isActive})=>{
                return isActive ? 'invisible' : ''
            }}><button  className=" text-black font-new-amsterdam px-3  py-1 ">
                log in
            </button></NavLink>
            </div>
          </nav>
        
        </>
    )
}


export default NavBar;