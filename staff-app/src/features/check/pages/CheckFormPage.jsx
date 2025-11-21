import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CheckFormPage() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tires: false,
    brakes: false,
    battery: false,
    lights: false,
    scratch: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      vehicleId,
      checkList: form,
      checkedAt: new Date().toISOString(),
    };

    console.log("Check form submitted:", payload);

    // 🔥 TODO: Gửi về API gateway
    // await api.post("/staff/vehicle/check", payload);

    alert("Check form submitted!");
    navigate("/stations");
  };

  return (
    <div className="page container">
      <h1>Vehicle Check Form</h1>
      <p>Vehicle ID: <strong>{vehicleId}</strong></p>

      <form onSubmit={handleSubmit} className="check-form">
        <h2>Checklist</h2>

        <label>
          <input
            type="checkbox"
            name="tires"
            checked={form.tires}
            onChange={handleChange}
          />
          Tires OK
        </label>

        <label>
          <input
            type="checkbox"
            name="brakes"
            checked={form.brakes}
            onChange={handleChange}
          />
          Brakes OK
        </label>

        <label>
          <input
            type="checkbox"
            name="battery"
            checked={form.battery}
            onChange={handleChange}
          />
          Battery OK
        </label>

        <label>
          <input
            type="checkbox"
            name="lights"
            checked={form.lights}
            onChange={handleChange}
          />
          Lights OK
        </label>

        <h2>Damage Check</h2>

        <label>Scratches / Damages</label>
        <textarea
          name="scratch"
          placeholder="Describe scratches..."
          value={form.scratch}
          onChange={handleChange}
        />

        <label>Notes</label>
        <textarea
          name="note"
          placeholder="Additional notes..."
          value={form.note}
          onChange={handleChange}
        />

        <button type="submit" className="btn-submit">
          Submit Check
        </button>
      </form>

      <style>{`
        .check-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 600px;
        }
        .check-form input[type="checkbox"] {
          margin-right: 8px;
        }
        .check-form textarea {
          width: 100%;
          min-height: 80px;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
        .btn-submit {
          padding: 12px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
