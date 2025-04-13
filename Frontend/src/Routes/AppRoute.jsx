import React from 'react'
import {BrowserRouter ,  Route, Routes , } from 'react-router-dom'
import Signup from '../Auth/Signup'
import QuestionDetail from '../components/Question/QuestionDetails';
import AskQuestion from '../components/Pages/AskQuestion';
import Login from '../Auth/Login';
import Home from '../components/Pages/Home';
import Profile from '../components/Pages/Profile';
import ProtectedRoute from '../Others/ProtectedRoute';
import Navbar from '../components/Navbar';
import { SideBarPart } from '@/components/ui/SideBarPart';

const AppRoute = () => {
  return (
  <BrowserRouter>
      <Navbar/>
  <Routes>
    <Route path='/' element={  <>
     <div className="flex bg-accent-foreground">
     <SideBarPart className='bg-accent-foreground'/>
     <Home/> 
     </div>
    </>}/>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/profile" element={<ProtectedRoute>  <SideBarPart/> <Profile/> </ProtectedRoute>} />
    <Route path="/questions/:id" element={<ProtectedRoute>  <SideBarPart/> <QuestionDetail/> </ProtectedRoute>} />
    <Route path="/ask" element={<ProtectedRoute>  <SideBarPart/> <AskQuestion/> </ProtectedRoute>} />

  </Routes>
   </BrowserRouter>
  )
}

export default AppRoute