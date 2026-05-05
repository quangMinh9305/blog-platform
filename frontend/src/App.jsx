import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import layouts
import AuthLayout from './components/layout/AuthLayout';

//import pages
import HomePage from './pages/HomePage';
import MyPosts from './pages/MyPosts';
import Login from './pages/auth/Login';
import Register from './pages/Register';
// import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          {/* Add more routes as we create pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
