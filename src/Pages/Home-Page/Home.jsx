import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <form className="home" onSubmit={handleSubmit}>
        <h1>You are logged in</h1>

        <Button type="submit" variant="danger">
          Log Out
        </Button>
      </form>
    </div>
  );
}
