import React from 'react';
import './App.css';
import { WelcomePage, Home } from './module';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { MainContextType } from './types';
import { Transaction_model } from './module/API';


//! Definuj kontext pre hlavný kontext
const mainContext = React.createContext<MainContextType>({
  mainData: [],
  setMainData: () => [],
});


function App(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [mainData, setMainData] = React.useState<Transaction_model[]>([]);


  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate('/fxb/welcome')
    }
  }, [location.pathname, navigate]);


  return (
    <div className="app">
      <mainContext.Provider value={{ mainData, setMainData }}>
        <Routes>
          <Route path="/fxb/welcome" element={<WelcomePage />} />
          <Route path="/fxb/home" element={<Home />} />
        </Routes>
      </mainContext.Provider>

    </div>
  );
}

const Content_app = {
  App,
  mainContext,
}

export default Content_app;
