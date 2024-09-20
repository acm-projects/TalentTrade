//import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
//import logo from './logo.svg'
import './App.css'
import NavBar from './components/NavBarPost/NavBar';
import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'

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
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
