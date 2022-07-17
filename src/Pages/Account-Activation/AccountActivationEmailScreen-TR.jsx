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
            toast.error("Yöneticinin hesabı etkinleştirmesine gerek yok");
        } else {
            axios
                .post(`${apiURL.url}/api/send-activation-mail?email=${inputs.email}`)
                .then((response) => {
                    toast.success(response.data.message.tr)
                })
                .catch((err) => {
                    const message = err.response.data.message.tr;
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
                        <h2 className="title">Hesabı etkinleştir</h2>
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
                            Email gönder
                        </button>

                        <p className="have-account">
                            Hesabın aktif mi?
                            <span>
                                <Link to="/login-tr" className="login">
                                    Giriş
                                </Link>
                            </span>
                        </p>

                        <Link
                            className="language"
                            to="/account-activation-email-screen"
                        >
                            <em>visit in English</em>
                        </Link>

                    </form>
                </div>
            </div>
        </div>
    );
}