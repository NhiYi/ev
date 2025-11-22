import { db } from "../config/db.js";

export const PaymentModel = {
  create(data) {
    return db.run(
      `
      INSERT INTO payments (rentalId, userId, amount, method, status, note)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        data.rentalId,
        data.userId,
        data.amount,
        data.method,
        data.status || "pending",
        data.note || null
      ]
    ).then((result) => ({ id: result.lastID, ...data }));
  },

  findById(id) {
    return db.get("SELECT * FROM payments WHERE id = ?", [id]);
  },

  findByRental(rentalId) {
    return db.all(
      "SELECT * FROM payments WHERE rentalId = ? ORDER BY createdAt DESC",
      [rentalId]
    );
  },

  findByUser(userId) {
    return db.all(
      "SELECT * FROM payments WHERE userId = ? ORDER BY createdAt DESC",
      [userId]
    );
  },

  updateStatus(id, status) {
    return db.run(
      `UPDATE payments SET status = ? WHERE id = ?`,
      [status, id]
    );
  },

  addNote(id, note) {
    return db.run(
      `UPDATE payments SET note = ? WHERE id = ?`,
      [note, id]
    );
  }
};
