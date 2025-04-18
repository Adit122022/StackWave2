import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import QuestionDetail from '../components/Question/QuestionDetails';
import AskQuestion from '../components/Pages/AskQuestion';
import Home from '../components/Pages/Home';
import Profile from '../components/Pages/Profile';
import Tag from '../components/Pages/Tag';
import TagQuestions from '../components/Pages/TagQuestions';

import Navbar from '../components/Navbar';
import TopBar from '@/components/TopBar';
import ProtectedRoute from '../Others/ProtectedRoute';
import DashboardLayout from '@/utils/DashboardLayout';

const AppRoute = () => {
  return (
    <BrowserRouter>
      <TopBar />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/questions/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <QuestionDetail />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ask"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AskQuestion />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tags"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Tag />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tags/:tagName"
          element={
            <DashboardLayout>
              <TagQuestions />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
