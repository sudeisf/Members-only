import hero from '../assets/hero.svg';
import { useAuth } from '../Context/AuthContext';
import Posts from '../components/posts';
import Club from '../components/club';
import vid from '../assets/animation/hero.webm'
import {motion as m} from 'framer-motion'

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  
  

  return (
    <div>
      {!isAuthenticated ? (
        <div className="bg-light-background dark:bg-dark-background flex xl:h-[43.5rem] h-[100vh]">
          <div className="w-[50%] text-center items-center flex flex-col md:p-10 gap-6 ml-auto mr-auto mt-auto mb-auto text-white">
            <img src={hero} alt="hero" className="w-[20rem] ml-auto mr-auto" />

            <h1 className="font-Bebas-Neue text-[3rem] md:text-[4rem] text-center text-black dark:text-white">
              Welcome to Members Only
            </h1>

            <p className="text-black dark:text-slate-300 md:text-md font-Rubik font-normal md:text-left text-wrap text-justify">
              We are happy to have you on our site. You can share your posts on whatever you want. It's secure and also has private clubs. 
              Join us on this journey by signing up today.
            </p>

            <button 
            className=" bg-dark-background   dark:bg-[#0D9488] mt-3  text-center hover:bg-slate-700 hover:text-white text-white w-[50%] capitalize font-Jersey md:text-xl h-12 p-2 rounded-2xl border-2 shadow-lg ml-auto mr-auto">
              Sign up today
            </button>
          </div>
        </div>
      ) : (
        <div >
          <div className="bg-light-background dark:bg-dark-background  flex xl:h-[43rem] h-[50rem] border-white  ">
            <div className="w-[60%] mr-auto ml-auto text-center align-middle mb-auto mt-auto md:p-5 flex flex-col gap-5">
            {/* <img src={hero} alt="hero" className="w-[15rem] lg:w-[20rem] ml-auto mr-auto" /> */}

                
                  <h1 className="font-new-amsterdam uppercase text-[3rem] lg:text-[3rem] text-left text-black  dark:text-white drop-shadow-xl">
                    Discover Your Passion, Connect with Your Tribe. Join Clubs, Share Stories, and Explore Together!
                    </h1>

               
             

              <p className="text-black dark:text-white text-sm lg:text-lg font-Rubik font-normal  text-center  3xl:max-w-[60%] mr-auto ml-auto">
                The "Members Only" project is a web application designed to provide exclusive access to content and features for registered users.
              </p>
              <div>
                <button className="bg-dark-background dark:bg-[#0D9488] mt-3  text-center hover:bg-cyan-600 text-white w-[50%] capitalize font-Bebas-Neue md:text-xl h-12 p-2 rounded-xl drop-shadow-xl ml-auto mr-auto">
                  Explore More
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap gap-4 px-4 md:px-10 lg:px-20 xl:gap-3 xl:px-40 bg-[#fafafa] dark:bg-dark-background">
              
                <Posts />
             
                <Club />
             
           </div>

        </div>
      )}
    </div>
  );
};

export default Home;
