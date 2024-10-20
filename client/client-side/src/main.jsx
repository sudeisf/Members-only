import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import './index.css';



import ProtectedRoute from './pages/protected.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import Posts from './pages/posts.jsx';
import ClubPage from './pages/ClubPage.jsx';
import SecretSection from './components/SecretePage.jsx';
import Home from './pages/home.jsx';
import PostPage from './pages/postPage.jsx';
import { QueryClient , QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Base layout for the application
    children: [
      {
        path: '/',
        index:true,
        element: <Home />,
      },

    
      {
        path: 'protected',
        element: <ProtectedRoute />, 
        children: [
          {
            path: 'posts',
            element: <PostPage />,
          },
          {
            path: 'club',
            element: <ClubPage />,
          }
        
        ]
    }
]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
