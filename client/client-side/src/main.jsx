import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import './index.css';



import ProtectedRoute from './pages/protected.jsx';
import ClubPage from './pages/Club.jsx';
import Home from './pages/home.jsx'
import PostPage from './pages/CreatePost.jsx';
import { QueryClient , QueryClientProvider } from 'react-query';
import { ThemeProvider } from './Context/ThemeContext.jsx';
import PostHome from './pages/Post.jsx';

import EditProfile from './components/profile/editProfile.jsx';
import { Notifications } from './pages/Notification.jsx';

const queryClient = new QueryClient();

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      {
        path: '/',
        index:true,
        element: <Home />,
      }
      ,
  
      {
        path: 'protected',
        element: <ProtectedRoute />, 
        children: [
          {
            path: 'posts',
            element: <PostHome />,
          
        },
          {
            path: 'posts/:id',
            element: <PostPage />,
          },
          {
            path: 'club',
            element: <ClubPage />,
          },{
            path: 'edit-profile',
            element: <EditProfile />,
          },{
            path: 'notifications',
            element : <Notifications />
          }
        ]
    }
]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
//edited