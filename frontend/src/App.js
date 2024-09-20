import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Signin from './pages/Signin'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
