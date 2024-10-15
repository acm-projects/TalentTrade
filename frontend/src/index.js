import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SkillContextProvider } from "./context/SkillContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SkillContextProvider>
      <App />
    </SkillContextProvider>
  </React.StrictMode>
);
