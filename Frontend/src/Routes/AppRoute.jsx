import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../Others/ProtectedRoute';
import DashboardLayout from '@/utils/DashboardLayout';

// Auth Components
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';

// Page Components
import Home from '../components/Pages/Home';
import Profile from '../components/Pages/Profile';
import Tag from '../components/Pages/Tag';
import Users from '@/components/Pages/Users';
import SettingsPage from '@/components/Pages/SettingsPage';
import AskQuestion from '../components/Pages/AskQuestion';

// Question Components
import Questions from '../components/Question/Questions';
import QuestionDetail from '../components/Question/QuestionDetails';
import TagQuestions from '../components/Question/TagQuestions';

// Layout Components
import Foooter from '@/components/Foooter';
import Navbar from '@/components/Navbar';

// Route configuration
const routes = [
  // Public routes
  {
    path: '/login',
    element: <Login />,
    isPublic: true
  },
  {
    path: '/signup',
    element: <Signup />,
    isPublic: true
  },

  // Protected routes with dashboard layout
  {
    path: '/',
    element: <Home />,
    protected: true
  },
  {
    path: '/question',
    element: <Questions />,
    protected: true
  },
  {
    path: '/profile',
    element: <Profile />,
    protected: true
  },
  {
    path: '/question/:id',
    element: <QuestionDetail />,
    protected: true
  },
  {
    path: '/ask',
    element: <AskQuestion />,
    protected: true
  },
  {
    path: '/tags',
    element: <Tag />,
    protected: true
  },
  {
    path: '/tags/:tagName',
    element: <TagQuestions />,
    protected: false // Public but with layout
  },
  {
    path: '/setings',
    element: <SettingsPage />,
    protected: true
  },
  {
    path: '/users',
    element: <Users />,
    protected: true
  }
];

const AppRoute = () => {
  return (
    <BrowserRouter>
 
     <div className='relative '>
       <Navbar/>
     </div>
      <Routes>
        {routes.map((route, index) => {
          const routeElement = route.protected ? (
            <ProtectedRoute>
              <DashboardLayout>
                {route.element}
              </DashboardLayout>
            </ProtectedRoute>
          ) : route.isPublic ? (
            route.element
          ) : (
            <DashboardLayout>
              {route.element}
            </DashboardLayout>
          );

          return (
            <Route
              key={index}
              path={route.path}
              element={routeElement}
            />
          );
        })}
      </Routes>
      
      <Foooter />
    </BrowserRouter>
  );
};

export default AppRoute;