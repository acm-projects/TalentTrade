import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Signin from './pages/Signin'
// import NavBarPost from './components/NavBarPost/NavBar'
import NavBarPre from './components/NavBarPre/NavBar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBarPre />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Signin />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
