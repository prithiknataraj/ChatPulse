import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import LandingPage from './components/Landing.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
