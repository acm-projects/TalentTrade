import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/preHome/preHome';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Messages from './pages/Messages';
import Browse from './pages/Browse';
import { ChatContextProvider } from './contexts/ChatContext';
import { AuthContextProvider, AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';

function App() {
  const { user, authLoading } = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="App">
          {authLoading ? (
            <div>Loading...</div>
          ) : (
            <ChatContextProvider user={user}>
              <div className="pages">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/messages"
                    element={user ? <Messages /> : <Signin />}
                  />
                  <Route
                    path="/browse"
                    element={user ? <Browse /> : <Signin />}
                  />
                </Routes>
              </div>
            </ChatContextProvider>
          )}
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
