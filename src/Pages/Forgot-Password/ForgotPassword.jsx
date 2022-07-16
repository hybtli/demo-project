import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiURL from "../../config.json";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [inputs, setInputs] = useState({});
  const axios = require("axios");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputs.email === "admin@delta.smart") {
      toast.error("Admin no need to change password");
    } else {
      axios
        .post(
          `${apiURL.url}/api/send-forget-password-mail?email=${inputs.email}`
        )
        .then((response) => {
          alert("Activation link is sent");
        })
        .catch((err) => {
          const message = err.response.data.message.en;
          toast.error(message);
        });
    }
  };

  return (
    <div>
      <form className="forgot-password-container" onSubmit={handleSubmit}>
        <label className="reset-email-label">
          Enter your mail to reset password:
        </label>
        <input
          name="email"
          className="reset-email-input"
          type="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          required
        />

        <button className="send-token-button" type="submit">
          Send Email
        </button>

        <Link className="cancel-link" to="/login">
          Cancel
        </Link>
      </form>
    </div>
  );
}
