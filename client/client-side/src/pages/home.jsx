import hero from '../assets/hero.svg';
import { useAuth } from '../Context/AuthContext';
import Posts from '../components/post/posts';
import Club from '../components/club/SuggestedClubs';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-light-background dark:bg-dark-background ">
      {!isAuthenticated ? (
        <div className="bg-light-background dark:bg-dark-background flex flex-col items-center justify-center mt-10 md:mt-0 px-4">
          <div className="w-full max-w-4xl text-center flex flex-col items-center gap-6 p-4 md:p-10">
            <img src={hero} alt="hero" className="w-4/5 max-w-xs md:max-w-md" />

            <h1 className="font-new-amsterdam uppercase font-medium text-3xl md:text-4xl lg:text-5xl text-black dark:text-white">
              Welcome to Members Only
            </h1>

            <p className="text-sm md:text-lg lg:text-xl text-gray-500 dark:text-slate-300 font-Rubik max-w-2xl">
              We are happy to have you on our site. You can share your posts on whatever you want. It's secure and also has private clubs. 
              Join us on this journey by signing up today.
            </p>

            <button className="bg-dark-background dark:bg-[#0D9488] hover:bg-cyan-700 text-white w-full max-w-xs md:max-w-md text-lg md:text-xl h-12 p-2 rounded-md shadow-lg">
              Sign up today
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-light-background dark:bg-dark-background flex flex-col items-center text-center px-4 md:px-10 min-h-screen">
            <div className="w-full max-w-4xl flex flex-col items-center gap-5 p-5 h-full justify-center mt-32">
              <h1 className="font-new-amsterdam uppercase text-2xl md:text-3xl lg:text-6xl text-black dark:text-white drop-shadow-xl">
                Discover Your Passion, Connect with Your Tribe. Join Clubs, Share Stories, and Explore Together!
              </h1>

              <p className="text-black dark:text-white text-sm md:text-lg font-Rubik max-w-2xl">
                The "Members Only" project is a web application designed to provide exclusive access to content and features for registered users.
              </p>

              <button className="bg-dark-background dark:bg-[#0D9488] mt-3 hover:bg-cyan-600 transition duration-300 text-white w-4/5 md:w-2/5 text-lg md:text-xl h-12 rounded-xl shadow-lg">
                Explore More
              </button>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-4 px-4 md:px-10 lg:px-20 xl:px-40 bg-[#fafafa] dark:bg-dark-background">
            <Posts />
            <Club />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
