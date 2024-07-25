import React from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

import { BrowserRouter , Navigate, Route , Routes } from 'react-router-dom';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={"/signup"} />}/>
        <Route path='/signup' element= {<Signup />} />
        <Route path='/login' element= {<Login />} />
        <Route path='/home' element= {<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
