import React from 'react';
import './App.css';
import { WelcomePage, Home } from './module';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate('/drm/welcome');  // Presmeruj len ak si na root stránke
    }
  }, [location.pathname, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/drm/welcome" element={<WelcomePage />} />
        <Route path="/drm/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
