import { db } from "../config/db.js";
import axios from "axios";

export const logAction = (req, res) => {
  const { staffId, action, details } = req.body;

  db.run(
    `INSERT INTO staff_actions (staffId, action, details) VALUES (?, ?, ?)`,
    [staffId, action, details],
    async function (err) {
      if (err) return res.status(500).json({ error: err.message });

      await axios.post("http://localhost:4004/analytics/event", {
        type: "staff.action",
        payload: { staffId, action, details }
      });

      res.json({ id: this.lastID });
    }
  );
};
