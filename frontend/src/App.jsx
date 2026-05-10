import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import layouts
import AuthLayout from './components/layout/AuthLayout';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
//import pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

import HomePage from './pages/feed/HomePage';
import BookmarksPage from './pages/feed/BookmarksPage';
import FollowingFeedPage from './pages/feed/FollowingFeedPage';
import SearchResultsPage from './pages/feed/SearchResultsPage'; 
// import Explore

import MyPosts from './pages/dashboard/MyPostsPage';
// import './App.css';

function App() {
  return (
    <Router>
      {/* <div className="App"> */}
        <Routes>
          {/* Auth routes */}
          {/*test  */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password" element={<ResetPassword/>} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<div>Explore Page</div>} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/following" element={<FollowingFeedPage />} />
            <Route path="/search" element={<SearchResultsPage/>} />
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
