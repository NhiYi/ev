import { db } from "../config/db.js";

export const seedData = () => {
  db.serialize(() => {
    db.run(`
      INSERT INTO rentals (vehicleId, stationId, startTime, endTime, distance, cost)
      VALUES
      (1, 1, '2025-01-01 08:00', '2025-01-01 09:00', 8.5, 20000),
      (2, 1, '2025-01-02 14:00', '2025-01-02 14:45', 5.1, 15000),
      (3, 2, '2025-01-03 18:00', '2025-01-03 19:10', 11.2, 30000)
    `);

    console.log("Seeded Analytics Data");
  });
};
