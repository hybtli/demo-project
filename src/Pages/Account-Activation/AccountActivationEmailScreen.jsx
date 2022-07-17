import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiURL from "../../config.json";
import "./register.css";

export default function Register() {
  const [inputs, setInputs] = useState({});
  const axios = require("axios");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputs.email === "admin@delta.smart") {
      toast.error("Admin no need to activate account");
    } else {
      axios
        .post(`${apiURL.url}/api/send-activation-mail?email=${inputs.email}`)
        .then((response) => {
          toast.success(response.data.message.en);
        })
        .catch((err) => {
          const message = err.response.data.message.en;
          toast.error(message);
        });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <div className="register-form-left">
          <img
            className="register-form-image"
            src="https://i.pinimg.com/564x/b7/5e/a5/b75ea5711edc04b818145f49eb565958.jpg"
            alt=""
          />
        </div>

        <div className="register-form-right">
          <div className="register-form-title">
            <h2 className="title">Activation Account</h2>
          </div>

          <form
            className="register-form-wrapper"
            action="/account-activation"
            onSubmit={handleSubmit}
          >
            <label className="label">Email:</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
              className="input"
              placeholder="Email"
            />

            <button className="register-form-button" type="submit">
              Send Email
            </button>

            <p className="have-account">
              Already have an account?
              <span>
                <Link to="/login" className="login">
                  Log in
                </Link>
              </span>
            </p>

            <Link
              className="language"
              to="/account-activation-email-screen-tr"
            >
              <em>Türkçe ziyaret edin</em>
            </Link>

          </form>
        </div>
      </div>
    </div>
  );
}
