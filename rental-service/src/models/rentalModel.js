import { db } from "../config/db.js";

export const RentalModel = {
  create(data) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO rentals (
            userId, vehicleId, stationId,
            startTime, status, createdAt,
            deposit, depositStatus,
            handoverImages, contractFile,
            distanceKm, durationMinutes
        )
        VALUES (?, ?, ?, ?, ?, datetime('now'), ?, ?, ?, ?, ?, ?)`,
        [
          data.userId,
          data.vehicleId,
          data.stationId,
          data.startTime || null,
          data.status || "created",
          data.deposit || 0,
          data.depositStatus || "pending",
          data.handoverImages ? JSON.stringify(data.handoverImages) : "[]",
          data.contractFile || null,
          data.distanceKm || 0,
          data.durationMinutes || 0,
        ],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  },

  start(id, startTime) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE rentals SET startTime = ?, status = 'ongoing' WHERE id = ?`,
        [startTime || new Date().toISOString(), id],
        function (err) { if (err) reject(err); else resolve(true); }
      );
    });
  },

  end(id, endTime, distanceKm, durationMinutes) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE rentals
         SET endTime = ?, distanceKm = ?, durationMinutes = ?, status = 'completed'
         WHERE id = ?`,
        [
          endTime || new Date().toISOString(),
          distanceKm || 0,
          durationMinutes || 0,
          id
        ],
        function (err) { if (err) reject(err); else resolve(true); }
      );
    });
  },

  updateHandoverImages(id, images) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE rentals SET handoverImages = ? WHERE id = ?`,
        [JSON.stringify(images), id],
        function (err) { if (err) reject(err); else resolve(true); }
      );
    });
  },

  updateContractFile(id, path) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE rentals SET contractFile = ? WHERE id = ?`,
        [path, id],
        function (err) { if (err) reject(err); else resolve(true); }
      );
    });
  },

  payDeposit(id, amount) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE rentals SET deposit = ?, depositStatus = 'paid' WHERE id = ?`,
        [amount, id],
        function (err) { if (err) reject(err); else resolve(true); }
      );
    });
  },

  refundDeposit(id) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE rentals SET depositStatus = 'refunded' WHERE id = ?`,
        [id],
        function (err) { if (err) reject(err); else resolve(true); }
      );
    });
  },

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM rentals WHERE id = ?", [id], (err, row) =>
        err ? reject(err) : resolve(row)
      );
    });
  },

  findByUser(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM rentals WHERE userId = ? ORDER BY createdAt DESC",
        [userId],
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });
  }
};
