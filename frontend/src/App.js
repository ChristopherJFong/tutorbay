// import React from 'react';
// import './App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from './pages/LoginPage';
// import CardPage from './pages/CardPage';
// function App() {
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path="/" index element={<LoginPage />} />
//       <Route path="/cards" index element={<CardPage />} />
//     </Routes>
//   </BrowserRouter>
// );
// }
// export default App;



import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import LoginPage from './pages/LoginPage';
// import SignUpPage from './pages/SignUpPage';
// import HomePage from './pages/HomePage';
// import ForgotPasswordPage from './pages/ForgotPasswordPage';
// import VerifyEmailPage from './pages/VerifyEmailPage';
// import ResetPasswordPage from './pages/ResetPasswordPage';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      {/* <Route path="/SignUp" index element={<SignUpPage />} />
      <Route path="/Home" index element={<HomePage />} />
      <Route path="/ForgotPassword" index element={<ForgotPasswordPage />} />
      <Route path="/VerifyEmail" index element={<VerifyEmailPage />} />
      <Route path="/ResetPassword" index element={<ResetPasswordPage />} /> */}
    </Routes>
  </BrowserRouter>
);
}
export default App;

