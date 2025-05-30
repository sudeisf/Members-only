import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Signup from './components//forms/signup';
import NavBar from './components/static/navBar';
import LoginDialog from './components/forms/login';
import { Toaster } from "react-hot-toast";
import Overlays from './components/modals/overlays';
import {AuthInitializer} from "./components/initializer/authIntializer"
import Footer from './components/static/footer';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogO, setIsDialogO] = useState(false);
  
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const openSignUpDialog = () => setIsDialogO(true);
  const closeSignUpDialog = () => setIsDialogO(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <AuthInitializer/>
      {/* Dialog Components */}
      <LoginDialog isOpen={isDialogOpen} onClose={closeDialog} />
      <Signup isOpen={isDialogO} onClose={closeSignUpDialog} />
    
      {/* NavBar and Outlet */}
      <NavBar
        onLoginClick={openDialog}
        onSignUpClick={openSignUpDialog}
        onOpenS={isDialogO}
        onOpenL={isDialogOpen}
      />

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
