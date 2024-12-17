import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Signup from './components//forms/signup';
import NavBar from './components/static/navBar';
import LoginDialog from './components/forms/login';
import Overlays from './components/modals/overlays';


function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogO, setIsDialogO] = useState(false);
  

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);



  const openSignUpDialog = () => setIsDialogO(true);
  const closeSignUpDialog = () => setIsDialogO(false);

 

  return (
    <>
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

      {/* Here is where the Outlet context is provided */}
      <Outlet  />
    </>
  );
}

export default App;
