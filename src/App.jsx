import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login-Page/login";
import AccountActivationScreen from "./Pages/Account-Activation/AccountActivationEmailScreen";
import AccountActivation from "./Pages/Account-Activation/AccountActivationTokenScreen";
import ForgotPassword from "./Pages/Forgot-Password/ForgotPassword";
import Error from "./Pages/Error-Page/error";
import Home from "./Pages/Home-Page/Home";
import "./app.css";
import ResetPassword from "./Pages/Forgot-Password/ResetPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />

        <Route
          exact
          path="/account-activation-screen"
          element={<AccountActivationScreen />}
        />
        <Route
          exact
          path="/account-activation"
          element={<AccountActivation />}
        />

        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
