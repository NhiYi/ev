import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import { Staff } from "../models/Staff.js";

export const registerStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const staff = await Staff.create({
      name,
      email,
      password: hashed,
      role
    });

    // Analytics
    axios.post("http://localhost:4004/analytics/event", {
      type: "staff.created",
      payload: staff
    });

    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    const staff = await Staff.findByEmail(email);
    if (!staff) return res.status(404).json({ error: "Staff not found" });

    const match = await bcrypt.compare(password, staff.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: staff.id, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    axios.post("http://localhost:4004/analytics/event", {
      type: "staff.action",
      payload: {
        staffId: staff.id,
        action: "login",
        details: "Staff logged in"
      }
    });

    res.json({ token, staff });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
