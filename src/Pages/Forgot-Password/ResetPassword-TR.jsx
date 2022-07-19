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
            toast.error("Şifreler uyuşmuyor!");
        } else {
            axios
                .post(
                    `${apiURL.url}/api/reset-password?forgetPasswordToken=${forgetPasswordToken}&password=${inputs.password}`
                )
                .then((response) => {
                    navigate("/login-tr");
                })
                .catch((err) => {
                    const message = err.response.data.message.tr;
                    toast.error(message)
                });
        }
    };

    return (
        <div className="reset-password-container">
            <form className="reset-password-wrapper" onSubmit={handleSubmit}>
                <label className="reset-password-label">Yeni şifrenizi giriniz:</label>
                <input
                    name="password"
                    className="reset-password-input"
                    type="password"
                    placeholder="Şifre"
                    value={inputs.password || ""}
                    onChange={handleChange}
                    required
                />

                <label className="reset-password-label">
                    Yeni şifrenizi onaylayın:
                </label>
                <input
                    name="confirmPassword"
                    className="reset-password-input"
                    type="password"
                    placeholder="Şifreyi onayla"
                    value={inputs.confirmPassword || ""}
                    onChange={handleChange}
                    required
                />

                <button className="reset-password-button" type="submit">
                    Şifreyi yenile
                </button>

                <Link className="cancel-link" to="/login-tr">
                    İptal et
                </Link>

                <Link
                    className="language"
                    to={`/reset-password?forgetPasswordToken=${forgetPasswordToken}`}>
                    <em>visit in English</em>
                </Link>

            </form>
        </div>
    );
}