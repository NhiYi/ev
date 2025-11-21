// src/features/auth/RegisterPage.jsx
import React, { useState } from "react";
import { registerRequest } from "./authApi";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");

  function update(field, val) {
    setForm(prev => ({ ...prev, [field]: val }));
  }

  async function submit(e) {
    e.preventDefault();
    setMsg("");

    try {
      await registerRequest({ ...form, role: "staff" });
      setMsg("Created staff account!");
    } catch (err) {
      setMsg("Registration failed!");
    }
  }

  return (
    <div className="auth-container">
      <h2>Add New Staff</h2>
      {msg && <div className="auth-msg">{msg}</div>}

      <form className="auth-form" onSubmit={submit}>
        <input
          placeholder="Name..."
          value={form.name}
          onChange={e => update("name", e.target.value)}
        />

        <input
          placeholder="Email..."
          value={form.email}
          onChange={e => update("email", e.target.value)}
        />

        <input
          type="password"
          placeholder="Password..."
          value={form.password}
          onChange={e => update("password", e.target.value)}
        />

        <button>Create</button>
      </form>
    </div>
  );
}
