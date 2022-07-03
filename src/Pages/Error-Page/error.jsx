import React from "react";
import { useNavigate } from "react-router-dom";
import "./error.css";

function Error() {
  let navigate = useNavigate();

  return (
    <div className="error">
      <h1 className="error-404">Error 404</h1>
      <p className="error-404-p">
        Page that you requested not found. Go to login page
      </p>
      <button
        className="login-page"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login Page
      </button>
    </div>
  );
}

export default Error;
