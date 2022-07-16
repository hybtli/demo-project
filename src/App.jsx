import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login-Page/login";
import LoginTR from "./Pages/Login-Page/login-tr";
import AccountActivationEmailScreen from "./Pages/Account-Activation/AccountActivationEmailScreen";
import AccountActivationEmailScreenTR from "./Pages/Account-Activation/AccountActivationEmailScreen-TR";
import AccountActivationTokenScreen from "./Pages/Account-Activation/AccountActivationTokenScreen";
import AccountActivationTokenScreenTR from "./Pages/Account-Activation/AccountActivationTokenScreen-TR";
import ForgotPassword from "./Pages/Forgot-Password/ForgotPassword";
import ForgotPasswordTR from "./Pages/Forgot-Password/ForgotPassword-TR";
import ResetPassword from "./Pages/Forgot-Password/ResetPassword";
import Error from "./Pages/Error-Page/error";
import Home from "./Pages/Home-Page/Home";
import "./app.css";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>

        <Route
          exact
          path="/"
          element={<Login />}
        />

        <Route
          exact
          path="/login"
          element={<Login />}
        />

        <Route
          exact
          path="/login-tr"
          element={<LoginTR />}
        />

        <Route
          exact
          path="/account-activation-email-screen"
          element={<AccountActivationEmailScreen />}
        />

        <Route
          exact
          path="/account-activation-email-screen-tr"
          element={<AccountActivationEmailScreenTR />}
        />

        <Route
          exact
          path="/account-activation-token-screen"
          element={<AccountActivationTokenScreen />}
        />

        <Route
          exact
          path="/account-activation-token-screen-tr"
          element={<AccountActivationTokenScreenTR />}
        />

        <Route
          exact
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          exact
          path="/forgot-password-tr"
          element={<ForgotPasswordTR />}
        />

        <Route
          exact
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route exact path="/home" element={<Home />} />

        <Route path="*" element={<Error />} />

      </Routes>

    </BrowserRouter>
  );
}
