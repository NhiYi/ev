import { db } from "../config/db.js";

export const seedData = () => {
  db.serialize(() => {
    db.get("SELECT COUNT(*) as c FROM rentals", [], (err, row) => {
      if (!err && row && row.c === 0) {
        db.run(`INSERT INTO rentals (userId, vehicleId, stationId, startTime, endTime, distanceKm, durationMinutes, status, deposit)
                VALUES
                (1, 1, 1, '2025-01-01 08:00', '2025-01-01 09:00', 5.2, 60, 'completed', 0),
                (2, 2, 1, null, null, null, null, 'created', 0)
        `);
        console.log("Seeded Rental Data");
      }
    });
  });
};
