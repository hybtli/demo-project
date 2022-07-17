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
            toast.error("Yöneticinin şifreyi değiştirmesine gerek yok");
        } else {
            axios
                .post(
                    `${apiURL.url}/api/send-forget-password-mail?email=${inputs.email}`
                )
                .then((response) => {
                    toast.success(response.data.message.tr);
                })
                .catch((err) => {
                    const message = err.response.data.message.tr;
                    toast.error(message);
                });
        }
    };

    return (
        <div>
            <form className="forgot-password-container" onSubmit={handleSubmit}>
                <label className="reset-email-label">
                    Şifrenizi sıfırlamak için e-posta girin:
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
                    Email gönder
                </button>

                <Link className="cancel-link" to="/login-tr">
                    İptal et
                </Link>

                <Link
                    className="language"
                    to="/forgot-password"
                >
                    <em>visit in English</em>
                </Link>

            </form>
        </div>
    );
}