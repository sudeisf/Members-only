import { Heart, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-6">
            <div className="flex items-center mb-4">
              <div className="rounded-[50%] w-10 h-10 border-2 border-white drop-shadow-md flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20"></div>
                <span className="text-xl font-bold relative z-10">M</span>
              </div>
              <p className="font-new-amsterdam text-2xl ml-3 uppercase drop-shadow-xl">
                members-only
              </p>
            </div>
            <p className="text-gray-400 text-sm">
              Where exclusive content meets exceptional minds.
            </p>
          </div>

          <div className="lg:col-span-6 lg:text-right">
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-white"></div>
            </h3>
            <div className="flex flex-wrap justify-end gap-6">
              {['Home', 'Clubs', 'Posts', 'Notifications'].map((link) => (
                <a 
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="flex items-center text-gray-400 hover:text-white transition-all group text-sm"
                >
                  <ArrowRight size={14} className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">{link}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative pt-4">
          <div className="absolute top-0 left-0 right-0 h-px bg-white opacity-30"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-xs">
              © {new Date().getFullYear()} Members Only. All rights reserved.
            </div>
            <div className="flex items-center text-gray-400 text-xs">
              Made with <Heart size={14} className="mx-1 text-red-500 animate-pulse" /> by the Members Only Team
            </div>
          </div>
        </div>
      </div>

      <div className="h-0.5 bg-white opacity-30"></div>
    </footer>
  );
};

export default Footer; 