import React, {useEffect, useSate} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import Signin from './Signin'
import Dashboard from './Dashboard'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Shop from './Shop'
import Checkout from './Checkout'



const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
