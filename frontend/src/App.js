import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// pages & components
import Home from './pages/preHome';
import PostHome from "./pages/Home";
import Profile from './pages/profile';
import EditProfile from './pages/editProfile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Messages from './pages/Messages';

function App() {
  return (
    <div className="App">
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/home' element={<PostHome />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/messages" element={<Messages />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/edit' element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;