import './App.css';
import Signin from './Signin'
import Dashboard from './Dashboard'
import Shop from './Shop'
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import ky from 'ky'


function App() {

  const API_URL = process.env.API_URL || 'http://localhost:8088'

  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect = (() => {
    ky.get('/isAdmin', {
      prefixUrl: API_URL
    })
    .then(res => {
      console.log(res.data)
    })
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/dashboard" element={isAdmin ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
