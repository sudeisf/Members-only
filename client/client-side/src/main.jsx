import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './components/signup.jsx';
import App from './App.jsx';
import './index.css';
import Home from './pages/wellcome.jsx';
import Register from './pages/register.jsx';
import Wellcome from './pages/wellcome.jsx';
import LogIn from './components/login.jsx';
import ProtectedRoute from './pages/protected.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import Posts from './pages/posts.jsx';
import ClubPage from './pages/ClubPage.jsx';

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Base layout for the application
    children: [
      {
        path: '/',
        index:true,
        element: <Wellcome />,
      },

      {
        path: 'register',
        element: <Register />,
        children: [
          {
            path: 'signup',
            element: <SignUp />,
          },
          {
            path: 'login',
            element: <LogIn />,
          },
      ]
      },
      {
        path: 'protected',
        element: <ProtectedRoute />, 
        children: [
          {
            path: 'posts',
            element: <Posts />,
          },
          {
            path: 'club',
            element: <ClubPage />,
          },
        ]
    }
]
  }
]);

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
