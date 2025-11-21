// src/features/auth/LoginPage.jsx
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    try {
      await login(email, password);
      navigate("/");
    } catch (e) {
      setErr("Invalid credentials");
    }
  }

  return (
    <div className="auth-container">
      <h2>Staff Login</h2>

      {err && <div className="auth-error">{err}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>
    </div>
  );
}
