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
      role,
    });

    // 🔵 analytics: staff.created
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

    // 🔵 analytics: staff.login
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

// ✅ LẤY TẤT CẢ STAFF
export const getAllStaff = async (req, res) => {
  try {
    const data = await Staff.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ LẤY 1 STAFF (bạn bị thiếu HÀM NÀY)
export const getOneStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
