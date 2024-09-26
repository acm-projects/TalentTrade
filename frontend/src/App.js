//import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/preHome'
import Profile from './pages/profile'
import EditProfile from './pages/editProfile'
//import logo from './logo.svg'
import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/profile/edit' element={<EditProfile/>} />
        </Routes>
    </div>
  );
}

export default App;
