import { db } from "../config/db.js";

export const Staff = {
  create: (data) =>
    new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO staff (name, email, password, role) VALUES (?, ?, ?, ?)`,
        [data.name, data.email, data.password, data.role],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, ...data });
        }
      );
    }),

  findByEmail: (email) =>
    new Promise((resolve, reject) => {
      db.get(`SELECT * FROM staff WHERE email=?`, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    }),

  findById: (id) =>
    new Promise((resolve, reject) => {
      db.get(`SELECT * FROM staff WHERE id=?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    }),

  findAll: () =>
    new Promise((resolve, reject) => {
      db.all(`SELECT * FROM staff`, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    }),
};
