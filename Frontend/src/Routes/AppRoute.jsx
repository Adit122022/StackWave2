import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import QuestionDetail from '../components/Question/QuestionDetails';
import AskQuestion from '../components/Pages/AskQuestion';
import Home from '../components/Pages/Home.jsx';
import Profile from '../components/Pages/Profile';
import Tag from '../components/Pages/Tag';
import TagQuestions from '../components/Question/TagQuestions';
import Navbar from '../components/Navbar';
import TopBar from '@/components/TopBar';
import ProtectedRoute from '../Others/ProtectedRoute';
import DashboardLayout from '@/utils/DashboardLayout';
import SettingsPage from '@/components/Pages/SettingsPage';
import Questions from '../components/Question/Questions';
import Foooter from '@/components/Foooter';
import Users from '@/components/Pages/Users';

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
        <Route
          path="/question"
          element={
            <DashboardLayout>
              <Questions />
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
          path="/question/:id"
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
        <Route
          path="/setings"
          element={
            <DashboardLayout>
            <SettingsPage/>
            </DashboardLayout>
          }
        />
        <Route
          path="/users"
          element={
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          }
        />
      </Routes>
  <Foooter/>
    </BrowserRouter>
  );
};

export default AppRoute;
