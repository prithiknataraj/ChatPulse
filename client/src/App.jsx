import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Chat from './components/Chat.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
