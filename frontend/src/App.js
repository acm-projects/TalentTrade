import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// pages & components
import Questionaire from './pages/skillQuestionaire';
import Browse from './pages/Browse'
import FAQ from './pages/FAQ'
import Home from './pages/preHome';
import PostHome from "./pages/Home";
import Profile from './pages/profile';
import EditProfile from './pages/editProfile';
import Signin from './pages/Signin';
import OtherUser from './pages/OtherUser'
import Messages from './pages/Messages';

function App() {
  return (
    <div className="App">
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/home' element={<PostHome/>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/messages" element={<Messages />} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/profile/edit' element={<EditProfile/>} />
            <Route path='/:username' element={<OtherUser/>} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/questionaire" element={<Questionaire />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;