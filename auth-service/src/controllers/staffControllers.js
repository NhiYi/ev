import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const StaffController = {
  register(req, res) {
    const { name, email, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);

    db.run(
      `INSERT INTO staff(name,email,password) VALUES (?,?,?)`,
      [name, email, hashed],
      (err) => {
        if (err) return res.status(400).json({ error: "Email already exists" });
        res.json({ message: "Staff registered" });
      }
    );
  },

  login(req, res) {
    const { email, password } = req.body;

    db.get(`SELECT * FROM staff WHERE email=?`, [email], (err, staff) => {
      if (!staff) return res.status(404).json({ error: "Not found" });

      const match = bcrypt.compareSync(password, staff.password);
      if (!match) return res.status(400).json({ error: "Wrong password" });

      const token = jwt.sign(
        { id: staff.id, role: "staff" },
        "SECRET",
        { expiresIn: "7d" }
      );

      res.json({ token, staff });
    });
  }
};
