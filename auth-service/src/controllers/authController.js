import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { initUserModel } from "../models/User.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "ev-secret-key";

async function getDB() {
  return await initUserModel();
}

// ------------------ Register ------------------
export const register = async (req, res) => {
  try {
    const db = await getDB();
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "fullName, email and password are required" });
    }

    const exists = await db.get("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const result = await db.run(
      "INSERT INTO users (fullName, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [fullName, email, hashed, phone || null, "renter"]
    );

    const newId = result?.lastID ?? result?.lastrowid ?? null;

    res.status(201).json({ message: "User registered", id: newId });
  } catch (err) {
    console.error("register error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------ Login ------------------
export const login = async (req, res) => {
  try {
    const db = await getDB();
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "email and password required" });

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const payload = { id: user.id, role: user.role || "renter" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    delete user.password;

    res.json({ token, user });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------ Upload CCCD + License ------------------
export const uploadDocuments = async (req, res) => {
  try {
    const db = await getDB();

    const userId = req.body.userId || req.user?.id;
    if (!userId)
      return res.status(400).json({ message: "userId is required" });

    // -----------------------
    // FIX: đọc đúng field từ multer
    // -----------------------
    const cccdPath = req.files?.cccdImage?.[0]?.path ?? null;
    const licensePath = req.files?.licenseImage?.[0]?.path ?? null;

    await db.run(
      "UPDATE users SET cccdImage = ?, licenseImage = ? WHERE id = ?",
      [cccdPath, licensePath, userId]
    );

    res.json({
      message: "Documents uploaded successfully",
      cccdImage: cccdPath,
      licenseImage: licensePath,
    });
  } catch (err) {
    console.error("uploadDocuments error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------ Staff verify renter ------------------
export const staffVerifyRenter = async (req, res) => {
  try {
    const db = await getDB();
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ message: "renter id required in params" });

    await db.run("UPDATE users SET verified = 1 WHERE id = ?", [id]);

    try {
      await db.run(
        `INSERT INTO staff_verify_logs (staffId, userId, timestamp)
           VALUES (?, ?, datetime('now'))`,
        [req.user?.id ?? null, id]
      );
    } catch (logErr) {}

    res.json({ message: "Renter verified by staff" });
  } catch (err) {
    console.error("staffVerifyRenter error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------ Get user info ------------------
export const getUser = async (req, res) => {
  try {
    const db = await getDB();
    const id = req.params.id || req.query.id || req.user?.id;

    if (!id) return res.status(400).json({ message: "user id required" });

    const user = await db.get(
      `SELECT id, fullName, email, phone, role, 
              cccdImage, licenseImage, verified
       FROM users WHERE id = ?`,
      [id]
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("getUser error:", err);
    res.status(500).json({ error: err.message });
  }
};
