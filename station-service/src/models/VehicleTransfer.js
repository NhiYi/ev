import { db } from "../config/db.js";

export const VehicleTransferModel = {
  create(data) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO vehicle_transfers(vehicleId, fromStation, toStation, staffId, note) VALUES(?,?,?,?,?)`,
        [data.vehicleId, data.fromStation, data.toStation, data.staffId, data.note || null],
        function (err) { if (err) reject(err); else resolve({ id: this.lastID, ...data }); }
      );
    });
  },

  findByVehicle(vehicleId) {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM vehicle_transfers WHERE vehicleId = ? ORDER BY createdAt DESC", [vehicleId], (err, rows) => (err ? reject(err) : resolve(rows)));
    });
  }
};
