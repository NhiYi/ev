import { db } from "../config/db.js";

export const Station = {
  findAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM stations", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM stations WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  create(data) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO stations (name, location) VALUES (?, ?)",
        [data.name, data.location],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  },

  update(id, data) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE stations SET name = ?, location = ? WHERE id = ?",
        [data.name, data.location, id],
        err => (err ? reject(err) : resolve())
      );
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM stations WHERE id = ?", [id], err =>
        err ? reject(err) : resolve()
      );
    });
  }
};
