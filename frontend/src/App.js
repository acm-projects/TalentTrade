import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/preHome/preHome'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Messages from './pages/Messages'
import Browse from './pages/Browse'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
