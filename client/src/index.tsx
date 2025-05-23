import React from 'react';
import ReactDOM from 'react-dom/client';
import Content_app from './App';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Content_app.App />
    </React.StrictMode>
  </BrowserRouter>
);

