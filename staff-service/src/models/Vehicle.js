import { db } from "../config/db.js";

export const Vehicle = {
  create(data) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO vehicles (stationId, name, status)
         VALUES (?, ?, ?)`,
        [data.stationId, data.name, data.status || "available"],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  },

  findAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM vehicles", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  findByStation(stationId) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM vehicles WHERE stationId = ?",
        [stationId],
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });
  },

  updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE vehicles SET status = ? WHERE id = ?",
        [status, id],
        err => (err ? reject(err) : resolve())
      );
    });
  },

  transfer(vehicleId, fromStation, toStation, staffId) {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(
          "UPDATE vehicles SET stationId = ? WHERE id = ?",
          [toStation, vehicleId]
        );

        db.run(
          `INSERT INTO vehicle_transfers (vehicleId, fromStation, toStation, staffId)
           VALUES (?, ?, ?, ?)`,
          [vehicleId, fromStation, toStation, staffId],
          err => (err ? reject(err) : resolve())
        );
      });
    });
  }
};
