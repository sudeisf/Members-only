import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import './App.css'
import Signup from './components/signup';
import NavBar from './components/navBar';
import Home from './pages/home';
import LoginDialog from './components/login';
// import { Outlet } from 'react-router-dom';

function App() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogO, setIsDialogO] = useState(false);


  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const openSignUpDialog = () => setIsDialogO(true);
  const closeSignUpDialog = () => setIsDialogO(false);
  return (
    <>

<LoginDialog isOpen={isDialogOpen} onClose={closeDialog} />
<Signup isOpen={isDialogO} onClose={closeSignUpDialog} />



        <NavBar onLoginClick={openDialog} onSignUpClick={openSignUpDialog} onOpenS={isDialogO} onOpenL={isDialogOpen} />
        <div>
          <Outlet/>
        </div>

        
   
        
    </>
  )
}

export default App
