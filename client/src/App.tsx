import React from 'react';
import './App.css';
import { WelcomePage, Home } from './module';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

function App(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate('/fxb/welcome');  // Presmeruj len ak si na root stránke
    }
  }, [location.pathname, navigate]);

  return (
    <div className="app">
      <Routes>
        <Route path="/fxb/welcome" element={<WelcomePage />} />
        <Route path="/fxb/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
