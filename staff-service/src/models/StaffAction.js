import { db } from "../config/db.js";

export const StaffAction = {
  create(data) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO staff_actions (staffId, action, details) VALUES (?, ?, ?)`,
        [data.staffId, data.action, data.details || ""],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  },

  findByStaff(staffId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM staff_actions WHERE staffId = ? ORDER BY createdAt DESC`,
        [staffId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
};
