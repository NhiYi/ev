import { db } from "../config/db.js";

export default function logAction(actionName) {
  return (req, res, next) => {
    const staffId = req.user.id;
    const details = JSON.stringify(req.body);

    db.run(
      `INSERT INTO staff_actions (staffId, action, details) VALUES (?, ?, ?)`,
      [staffId, actionName, details],
      (err) => {
        if (err) console.log("Log error:", err);
      }
    );

    next();
  };
}
