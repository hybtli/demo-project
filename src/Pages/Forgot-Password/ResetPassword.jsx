import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiURL from "../../config.json";
import "./ResetPassword.css";

export default function ResetPassword() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const axios = require("axios");

  //Definitions for password validation begin here :

  // RegEx definitions :
  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  const lengthRegExp = /.{8,20}/;

  const uppercasePassword = uppercaseRegExp.test(inputs.password);
  const lowercasePassword = lowercaseRegExp.test(inputs.password);
  const digitsPassword = digitsRegExp.test(inputs.password);
  const specialCharPassword = specialCharRegExp.test(inputs.password);
  const lengthPassword = lengthRegExp.test(inputs.password);

  let errorMessage = "";

  //RegEx definitions for password validation finish here :

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Parol blәt !!!");
    } else {
      axios
        .post(
          `${apiURL.url}/api/reset-password?forgetPasswordToken=${inputs.token}&password=${inputs.password}`
        )
        .then((response) => {
          navigate("/login");
        })
        .catch((err) => {
          const message = err.response.data.message;
          if (message === "Password is not acceptable") {
            if (!uppercasePassword) {
              errorMessage = "At least one uppercase letter";
            } else if (!lowercasePassword) {
              errorMessage = "At least one lowercase";
            } else if (!digitsPassword) {
              errorMessage = "At least one digit";
            } else if (!specialCharPassword) {
              errorMessage = "At least one special characters";
            } else if (!lengthPassword) {
              errorMessage = "At least 8, at most 20 characters";
            }
            toast.error(errorMessage);
          } else {
            toast.error(message);
          }
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
      </form>
    </div>
  );
}
