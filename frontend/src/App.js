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
import Signup from './pages/Signup'
import Messages from './pages/Messages'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/home' element={<PostHome/>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/messages" element={<Messages />} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/profile/edit' element={<EditProfile/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
