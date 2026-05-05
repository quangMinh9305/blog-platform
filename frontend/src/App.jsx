import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import layouts
import AuthLayout from './components/layout/AuthLayout';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
//import pages
import HomePage from './pages/HomePage';
import MyPosts from './pages/MyPosts';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
// import './App.css';

function App() {
  return (
    <Router>
      {/* <div className="App"> */}
        <Routes>
          {/* Auth routes */}
          
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password" element={<ResetPassword/>} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            {}
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/my-posts" element={<MyPosts />} />
          </Route>
          
          {/* Add more routes as we create pages */}
        </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
