import React from 'react';
import './App.css';
import { LoginForm, WelcomePage, Home } from './module';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/drm/login');
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/drm/login" Component={WelcomePage} />
        <Route path="/drm/login?dialog=cardNumber" Component={LoginForm} />
        <Route path="/drm/home" Component={Home} />
      </Routes>
      <LoginForm />
    </div>
  );
}

export default App;
