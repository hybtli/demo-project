import { toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import apiURL from "../../config.json";
import "./register.css";

export default function AccountActivationTokenScreen() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const activationToken = params.get("activationToken");
    const axios = require("axios");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputs.password !== inputs.confirmPassword) {
            toast.error("Şifreler uyuşmuyor!");
        } else {
            axios
                .post(
                    `${apiURL.url}/api/activate-user?activationToken=${activationToken}&password=${inputs.password}`
                )
                .then((response) => {
                    navigate("/home");
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
                        action="/home"
                        onSubmit={handleSubmit}
                    >
                        <label className="label">Şifre:</label>
                        <input
                            type="password"
                            name="password"
                            value={inputs.password || ""}
                            onChange={handleChange}
                            required
                            className="input"
                            placeholder="Şifre"
                        />

                        <label className="label">Şifreyi Onayla:</label>
                        <input
                            name="confirmPassword"
                            className="input"
                            type="password"
                            placeholder="Şifreyi Onayla"
                            value={inputs.confirmPassword || ""}
                            onChange={handleChange}
                            required
                        />

                        <button className="register-form-button" type="submit">
                            Kayıt ol
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
                            to={`/account-activation?activationToken=${activationToken}`}
                        >
                            <em>visit in English</em>
                        </Link>

                    </form>
                </div>
            </div>
        </div>
    );
}