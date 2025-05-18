import Login from '@/components/Auth/Login';
import Signup from '@/components/Auth/Signup';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
