import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiURL from "../../config.json";
import "./login.css";

export default function Login() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const axios = require("axios");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(
        `${apiURL.url}/api/login?email=${inputs.email}&password=${inputs.password}`
      )
      .then((response) => {
        navigate("/home");
      })
      .catch((err) => {
        const message = err.response.data.message.en;
        toast.error(message);
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-form-left">
          <img
            className="login-form-image"
            src="https://img.freepik.com/free-vector/lazy-people-sitting-floor-working-with-laptop_11197-16.jpg?w=740"
            alt=""
          />
        </div>

        <div className="login-form-right">
          <div className="login-form-title">
            <h2 className="title">Login</h2>
          </div>

          <form
            className="login-form-wrapper"
            action="/home"
            onSubmit={handleSubmit}
          >
            <label className="label">Email:</label>
            <input
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
              required
              className="input"
              placeholder="Email"
            />

            <label className="label">Password:</label>
            <input
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
              required
              className="input"
              placeholder="Password"
            />

            <Link className="forgot-password" to="/forgot-password">
              Forgot Password?
            </Link>

            <button className="login-submit-button" type="submit">
              Login
            </button>

            <p className="no-account">
              No account?
              <span>
                <Link
                  className="create-account"
                  to="/account-activation-email-screen"
                >
                  Sign Up
                </Link>
              </span>
            </p>

            <Link
              className="language"
              to="/login-tr"
            >
              <em>Türkçe ziyaret edin</em>
            </Link>

          </form>
        </div>
      </div>
    </div>
  );
}
