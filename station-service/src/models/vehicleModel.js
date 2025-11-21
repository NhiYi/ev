import { db } from "../config/db.js";

export const VehicleModel = {
  findAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM vehicles", [], (err, rows) => (err ? reject(err) : resolve(rows)));
    });
  },

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM vehicles WHERE id = ?", [id], (err, row) => (err ? reject(err) : resolve(row)));
    });
  },

  findByStation(stationId) {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM vehicles WHERE stationId = ?", [stationId], (err, rows) => (err ? reject(err) : resolve(rows)));
    });
  },

  create(data) {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO vehicles(stationId, name, status) VALUES(?, ?, ?)", [data.stationId, data.name, data.status || "available"], function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...data });
      });
    });
  },

  update(id, data = {}) {
    const updates = [];
    const params = [];
    if (data.stationId !== undefined) { updates.push("stationId = ?"); params.push(data.stationId); }
    if (data.name !== undefined) { updates.push("name = ?"); params.push(data.name); }
    if (data.status !== undefined) { updates.push("status = ?"); params.push(data.status); }
    if (updates.length === 0) return Promise.resolve(true);
    params.push(id);
    const sql = `UPDATE vehicles SET ${updates.join(", ")} WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) { if (err) reject(err); else resolve(true); });
    });
  },

  remove(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM vehicles WHERE id = ?", [id], function (err) { if (err) reject(err); else resolve(true); });
    });
  }
};
