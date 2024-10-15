//import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/preHome'
import PostHome from "./pages/Home"
import Profile from './pages/profile'
import EditProfile from './pages/editProfile'
//import logo from './logo.svg'
import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Signin from './pages/Signin'
import Messages from './pages/Messages'
import OtherUser from './pages/OtherUser'

// pages & components
import Browse from './pages/Browse'
import FAQ from './pages/FAQ'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
