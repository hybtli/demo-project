import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiURL from "../../config.json";
import "./ResetPassword.css";

export default function ResetPassword() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const forgetPasswordToken = params.get("forgetPasswordToken");
  const axios = require("axios");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Passwords do not match !");
    } else {
      axios
        .post(
          `${apiURL.url}/api/reset-password?forgetPasswordToken=${forgetPasswordToken}&password=${inputs.password}`
        )
        .then((response) => {
          navigate("/login");
        })
        .catch((err) => {
          const message = err.response.data.message.en;
          toast.error(message);
        });
    }
  };

  return (
    <div className="reset-password-container">
      <form className="reset-password-wrapper" onSubmit={handleSubmit}>
        <label className="reset-password-label">Enter your new password:</label>
        <input
          name="password"
          className="reset-password-input"
          type="password"
          placeholder="Password"
          value={inputs.password || ""}
          onChange={handleChange}
          required
        />

        <label className="reset-password-label">
          Confirm your new password:
        </label>
        <input
          name="confirmPassword"
          className="reset-password-input"
          type="password"
          placeholder="Confirm Password"
          value={inputs.confirmPassword || ""}
          onChange={handleChange}
          required
        />

        <button className="reset-password-button" type="submit">
          Reset Password
        </button>

        <Link className="cancel-link" to="/login">
          Cancel
        </Link>

        <Link
          className="language"
          to={`/reset-password-tr?forgetPasswordToken=${forgetPasswordToken}`}>
          <em>Türkçe ziyaret edin</em>
        </Link>

      </form>
    </div>
  );
}
