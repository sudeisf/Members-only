import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider} from "react-router-dom"
import SignUp from './components/signup.jsx'

import App from './App.jsx'
import './index.css'
import Home from './pages/home.jsx'
import Register from './pages/register.jsx'
import LogIn from './components/login.jsx'

const router  = createBrowserRouter([
  {
    path: '/',
    element : <App />,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: 'register',
        element: <Register />,
        children: [
          {
            path:'signup',
            element: <SignUp />
          },
          {
            path: 'login',
            element : <LogIn />
          }
        ]
      }
    ]
  },
  {
    path: 'register',
    element: <Register />,
    children: [
      {
        path:'signup',
        element: <SignUp />
      }
    ]
  }
])





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
