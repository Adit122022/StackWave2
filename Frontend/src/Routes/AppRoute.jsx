import React from 'react'
import {BrowserRouter , Navigate, Route, Routes , } from 'react-router-dom'
import Signup from '../Auth/Signup'
import QuestionDetail from '../components/Question/QuestionDetails';
import AskQuestion from '../components/Pages/AskQuestion';
import Login from '../Auth/Login';
import Home from '../components/Pages/Home';
import Profile from '../components/Pages/Profile';
import ProtectedRoute from '../Others/ProtectedRoute';

const AppRoute = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<ProtectedRoute>  <Home/> </ProtectedRoute>}/>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/profile" element={<ProtectedRoute>  <Profile/> </ProtectedRoute>} />
    <Route path="/questions/:id" element={<ProtectedRoute>  <QuestionDetail/> </ProtectedRoute>} />
    <Route path="/ask" element={<ProtectedRoute>  <AskQuestion/> </ProtectedRoute>} />

  </Routes>
   </BrowserRouter>
  )
}

export default AppRoute