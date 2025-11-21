import express from "express";
import bcrypt from "bcryptjs";
import sqlite3 from "sqlite3";
import jwt from "jsonwebtoken";
import cors from "cors";
import "./src/server.js";


const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("./auth.db");

// Init table
db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    driverLicenseUrl TEXT,
    cccdUrl TEXT,
    verified INTEGER DEFAULT 0
)`);

// Register
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    db.run(
        `INSERT INTO users(name,email,password) VALUES(?,?,?)`,
        [name, email, hashed],
        (err) => {
            if (err) return res.status(400).json({ error: "Email exists" });
            res.json({ message: "Registered successfully" });
        }
    );
});

// Login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email=?`, [email], async (err, user) => {
        if (!user) return res.status(404).json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Wrong password" });

        const token = jwt.sign(
            { id: user.id, role: "renter" },
            "SECRET",
            { expiresIn: "7d" }
        );

        res.json({ token, user });
    });
});

app.listen(5001, () => console.log("Auth Service running on 5001"));
