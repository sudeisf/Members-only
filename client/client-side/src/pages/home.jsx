import heroPic from  '../assets/hero.jpg'


const Home  = ()=>{
    return(

        <>
          <div className="bg-slate-200 flex md:h-[500px] h-[80vh] ">
            <div className="w-[60%] mr-auto ml-auto text-center align-middle mb-auto mt-auto md:p-5 gap-5]">
                <h1 className="font-Bebas-Neue text-[3rem] md:text-[5rem] text-center ">wellcome to members only</h1>
                <p className="text-slate-700  md:text-xl font-new-amsterdam md:text-center text-wrap text-justify ">
                    we are happy to have you on our site
                you can share your posts on whate ever you want its secure and have also private clubs .
                     you can join us in this journy by signing up to day.</p>
                     <div >
                     <button className="border-black mt-3 border-2 text-center hover:bg-slate-700 hover:text-white  text-black w-[50%]  capitalize  font-Jersey md:text-xl h-12 p-2 rounded-xl shadow-md ml-auto mr-auto"> 
                          sign up today
                         </button>
                     </div>
            </div>
            {/* <img src={heroPic} alt="hero" className='w-[40%]'/> */}
          </div>
        
        </>

    )
}
export default Home;