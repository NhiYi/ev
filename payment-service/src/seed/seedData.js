import { db } from "../config/db.js";

export const seedData = () => {
  db.serialize(() => {
    db.get("SELECT COUNT(*) as c FROM payments", [], (err, row) => {
      if (err) {
        console.error("Seed payment check error:", err);
        return;
      }
      if (row && row.c === 0) {
        db.run(
          `INSERT INTO payments (paymentId, amount, currency, status, method, metadata, createdAt)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          ["pay_1", 50000, "VND", "captured", "card", JSON.stringify({orderId:"ord_1"}), new Date().toISOString()]
        );
        console.log("Seeded Payment Data");
      }
    });
  });
};
