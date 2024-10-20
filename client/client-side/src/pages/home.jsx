import hero from '../assets/hero.svg';
import { useAuth } from '../Context/AuthContext';
import Posts from './posts';
import Club from '../components/club';

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  
  

  return (
    <div>
      {!isAuthenticated ? (
        <div className="bg-[#111827] flex xl:h-[43.5rem] h-[100vh]">
          <div className="w-[50%] text-center items-center flex flex-col md:p-10 gap-6 ml-auto mr-auto mt-auto mb-auto text-white">
            <img src={hero} alt="hero" className="w-[20rem] ml-auto mr-auto" />

            <h1 className="font-Bebas-Neue text-[3rem] md:text-[4rem] text-center">
              Welcome to Members Only
            </h1>

            <p className="text-slate-100 md:text-md font-Rubik font-normal md:text-left text-wrap text-justify">
              We are happy to have you on our site. You can share your posts on whatever you want. It's secure and also has private clubs. 
              Join us on this journey by signing up today.
            </p>

            <button 
            className=" bg-[#0D9488] mt-3  text-center hover:bg-slate-700 hover:text-white text-white w-[50%] capitalize font-Jersey md:text-xl h-12 p-2 rounded-2xl border-2 shadow-lg ml-auto mr-auto">
              Sign up today
            </button>
          </div>
        </div>
      ) : (
        <div >
          <div className="bg-[#111827] flex xl:h-[43rem] h-[50rem] border-white  ">
            <div className="w-[60%] mr-auto ml-auto text-center align-middle mb-auto mt-auto md:p-5 flex flex-col gap-5">
            <img src={hero} alt="hero" className="w-[20rem] ml-auto mr-auto" />

              <h1 className="font-Jersey uppercase text-[3rem] md:text-[5rem] text-center text-slate-50 drop-shadow-xl">
                Welcome to Members Only
              </h1>
              <p className="text-slate-100 md:text-md font-Rubik font-normal md:text-left text-wrap text-justify 3xl:max-w-[60%] mr-auto ml-auto">
                The "Members Only" project is a web application designed to provide exclusive access to content and features for registered users.
                At its core, the project emphasizes the importance of authentication and authorization, 
                ensuring that only authenticated users can view or interact with certain sections of the site.
              </p>
              <div>
                <button className="bg-[#0D9488] mt-3  text-center hover:bg-cyan-600 text-white w-[50%] capitalize font-Bebas-Neue md:text-xl h-12 p-2 rounded-xl drop-shadow-xl ml-auto mr-auto">
                  Explore More
                </button>
              </div>
            </div>
          </div>
          <div className="flex xl:gap-3 xl:px-40">
            <Posts />
            <Club />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
