"use client"

import { Button } from "@/components/ui/button"
import { ActivityIcon, BadgeCheck, Bookmark, Calendar1Icon, CrownIcon, DotIcon } from "lucide-react"

import Image from "next/image"
import { useRouter } from "next/navigation"


const clubs = [
      {
            name: "Chess Club",
            discription: "Join our community of chess enthusiasts. From beginners to grandmasters, everyone is welcome to learn, play, and improve their game.",
            img: "/chess.jpg"
      },
      {
            name: "Fitness Warriors",
            discription: "Stay motivated with like-minded fitness enthusiasts. Share workout routines, nutrition tips, and achieve your fitness goals together.",
            img: "/fitness.jpg"
      },
      {
            name: "Book Lovers Society",
            discription: "A haven for bibliophiles. Discuss your favorite books, discover new authors, and participate in monthly reading challenges.",
            img: "/books.jpg"
      },
      {
            name: "Tech Innovators",
            discription: "Connect with fellow tech enthusiasts. Share knowledge about the latest technologies, work on projects, and network with industry professionals.",
            img: "/tech.jpg"
      },
      {
            name: "Photography Circle",
            discription: "Capture moments and share your perspective. Learn new techniques, participate in photo walks, and showcase your work.",
            img: "/photography.jpg"
      },
     
      {
            name: "Culinary Masters",
            discription: "Explore the art of cooking. Share recipes, learn new techniques, and enjoy virtual cooking sessions with fellow food lovers.",
            img: "/cooking.jpg"
      }
]

export default function Landing(){
      const router = useRouter();
      return (
            <div className="min-h-[100vh]">
                  <div className="flex items-center justify-between p-2 sm:p-4">
                        <div className="flex items-center gap-1 px-2 sm:px-5">
                              <Image src={'/lock.svg'} alt={"lock icon"} width={20} height={20} className="dark:invert" />
                              <h1 className="font-medium text-lg sm:text-xl drop-shadow-2xl text-blue-800">Memebers-only</h1>
                        </div>
                        <div className="flex gap-1 sm:gap-2">
                              <Button 
                                variant={"ghost"} 
                                className="px-2 sm:px-5 capitalize font-roboto font-medium text-md sm:text-md hover:bg-blue-50/0" 
                                onClick={() => router.push('/login')}
                              >
                                Login
                              </Button>
                              <Button 
                                className="px-2 sm:px-4 capitalize font-roboto font-medium rounded-sm shadow-sm text-sm sm:text-md bg-blue-800 hover:bg-blue-800/90"
                                onClick={() => router.push('/register')}
                              >
                                Sign up
                              </Button>
                        </div>
                  </div>
                  <div className="min-h-[vh] flex flex-col justify-evenly space-y-6 md:space-y-4">
                        <div className="space-y-3 max-w-2xl mx-auto px-4 sm:px-0 mt-2  md:mt-0">
                              <h1 className="w-fit bg-blue-700/5  text-blue-400 font-medium mx-auto py-1 flex px-5 rounded-full items-center font-roboto text-sm sm:text-base"><DotIcon className="bg-blue-400/20 animate-pulse text-blue-700 w-6 h-6 rounded-full mr-2" /> Wellcome</h1>
                              <p className="text-center text-gray-400 font-roboto font-medium text-base sm:text-lg">Discover and join exclusive clubs that match your interests. Connect with like-minded individuals and be part of something special.</p>
                        </div>
                        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 sm:gap-8 px-4 sm:px-0">
                              <div className="flex flex-col items-start justify-start text-left pl-2 sm:pl-10 w-full md:w-1/2 capitalize">
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-blue-800 py-2">
                                          Join Exclusive Clubs <span><img src="/curve.svg" className="w-8 sm:w-12 inline" /></span>
                                    </h1>
                                    <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 max-w-xl font-roboto">
                                         Connect with <span className="text-blue-600   font-robto font-medium"> like-minded individuals</span>, share experiences, and <span className="text-blue-600 ">be part of something special</span> . Your journey to meaningful connections starts here.
                                    </p>
                                    <Button className="px-6 animate-bounce sm:px-8 py-4 sm:py-6 rounded-lg text-base sm:text-lg bg-blue-800 hover:bg-blue-800/90 w-fit capitalize font-roboto font-medium shadow-lg hover:shadow-xl transition-all">
                                          Get Started
                                    </Button>
                              </div>
                              <div className="relative w-full md:max-w-2/3 h-full p-2">
                                    <div className="flex overflow-x-scroll gap-4 h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                          {clubs.map((club, index) => (
                                                <div 
                                                key={index}
                                                className="bg-white relative *:font-roboto rounded-lg border shadow-xs overflow-hidden min-w-[280px] sm:min-w-[400px] h-[300px] sm:h-[400px] hover:shadow-sm transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center"
                                          >
                                                <div className="relative w-full h-full">
                                                      <Image 
                                                            src={club.img} 
                                                            alt={club.name}
                                                            width={400}
                                                            height={400}
                                                            className="w-full h-full object-cover object-center"
                                                      />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                                                            <h3 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">{club.name}</h3>
                                                            <p className="text-xs sm:text-sm text-gray-200">{club.discription}</p>
                                                      </div>
                                                </div>
                                          </div>
                                          ))}
                                    </div>
                                    <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                              </div>
                        </div>
                        <div className="flex flex-col lg:flex-row mt-10 min-h-[80vh]">
                            <div className="w-full lg:w-1/2 p-4 sm:p-8 lg:p-20 space-y-5">
                            <h1 className="w-fit bg-blue-700/5  capitalize text-blue-400 font-medium py-1 flex px-5 rounded-full items-center font-roboto text-sm sm:text-base">features</h1> 
                            <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-blue-800 py-2"> The Blocks of powerfull platform </h1>
                            <p className="text-gray-400 font-roboto font-normal leading-7 text-base sm:text-lg">Our platform offers a seamless experience with real-time messaging, secure authentication, and personalized club recommendations. Enjoy exclusive content, event management, and a vibrant community of like-minded individuals.</p>
                            <Button variant={"ghost"} className="px-6 sm:px-8 py-4 sm:py-6  text-blue-600 text-base sm:text-lg  w-fit  font-roboto hover:text-blue-600  bg-blue-500/5 shadow-lg transition-all">
                                          Start free
                                    </Button>
                            </div>
                          
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-8 lg:p-20">
                              <div className="p-4 sm:p-6 rounded-lg gap-y-2 shadow-sm hover:bg-gradient-to-r hover:from-blue-400/10 hover:via-blue-200/10 hover:to-blue-100/30">
                                    <CrownIcon className="w-8 h-8 text-blue-800 mb-2" />
                                    <h1 className="text-lg font-semibold text-blue-800 font-roboto mb-2">Exclusivity</h1>
                                    <p className="text-gray-500">Secure, pass-code-protected clubs for private, trusted communities.</p>
                              </div>
                              <div className=" p-4 sm:p-6 rounded-lg gap-y-2 shadow-sm hover:bg-gradient-to-r hover:from-blue-400/10 hover:via-blue-200/10 hover:to-blue-100/30">
                                    <ActivityIcon className="w-8 h-8 text-blue-800 mb-2" />
                                    <h1 className="text-lg font-semibold mb-2 text-blue-800">Real-Time Engagement</h1>
                                    <p className="text-gray-500">Stay updated with instant notifications on posts and events</p>
                              </div>
                               <div className=" p-4 sm:p-6 rounded-lg gap-y-2 shadow-sm hover:bg-gradient-to-r hover:from-blue-400/10 hover:via-blue-200/10 hover:to-blue-100/30">
                                    <BadgeCheck className="w-8 h-8 text-blue-800 mb-2"/>
                                    <h1 className="text-lg font-semibold mb-2 text-blue-800">Social Interaction</h1>
                                    <p className="text-gray-500">Like, comment, and share fancy posts with ease.</p>
                              </div>
                              <div className=" p-4 sm:p-6 rounded-lg gap-y-2 shadow-sm hover:bg-gradient-to-r hover:from-blue-400/10 hover:via-blue-200/10 hover:to-blue-100/30">
                               <Calendar1Icon className="w-8 h-8 text-blue-800 mb-2" />
                                    <h1 className="text-lg font-semibold mb-2 text-blue-800">Event Planning</h1>
                                    <p className="text-gray-500">Organize and join club events effortlessly</p>
                              </div>
                              <div className=" p-4 sm:p-6 rounded-lg gap-y-2 shadow-sm hover:bg-gradient-to-r hover:from-blue-400/10 hover:via-blue-200/10 hover:to-blue-100/30">
                                    <Bookmark className="w-8 h-8 text-blue-800 mb-2" />
                                    <h1 className="text-lg font-semibold mb-2 text-blue-800">Future Features</h1>
                                    <p className="text-gray-500">Tease "Group Chat Coming Soon" to build anticipation.</p>
                              </div>
                              <div className=" p-4 sm:p-6  flex  items-center gap-4 rounded-lg gap-y-2 ">
                              <img src="/curve.svg" className="w-8 sm:w-12 inline animate-pulse" />
                              <p className="capitalize font-roboto text-blue-800">this platform will be open source soon</p>
                              </div>

                            </div>

                        </div>
                        <footer className="py-3 sm:py-4 w-full border-gray-200 dark:border-gray-700">
                              <div className="border-t w-fit mt-2 py-2 mx-auto">
                                    <p className="text-center text-xs sm:text-sm  text-blue-800">© {new Date().getFullYear()} Members Only. All rights reserved.</p>
                              </div>
                        </footer>
                  </div>
            </div>
      )
}