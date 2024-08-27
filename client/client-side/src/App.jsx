import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import './App.css'
import Signup from './components/signup';
import NavBar from './components/navBar';
import Home from './pages/home';
// import { Outlet } from 'react-router-dom';

function App() {


  return (
    <>
        <NavBar />
        <div>
          <Outlet/>
        </div>
        
   
        
    </>
  )
}

export default App
