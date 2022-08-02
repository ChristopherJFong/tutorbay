import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/signup" index element={<SignUpPage />} />
        <Route path="/verifyEmail" index element={<VerifyEmailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;