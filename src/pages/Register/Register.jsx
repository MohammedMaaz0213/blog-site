import React, { useEffect, useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    console.log("working");
    e.preventDefault();
    setError(false);

    alert("erererererererere");
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      console.log(res);
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form onSubmit={handleSubmit} className="registerForm">
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button class="registerButton">Register</button>

        <button type="submit" class="registerLoginButton">
          <Link className="link" to="/login">
            Login
          </Link>
        </button>
      </form>
      {error && <span style={{ color: "red" }}>Something went wrong</span>}
    </div>
  );
}
