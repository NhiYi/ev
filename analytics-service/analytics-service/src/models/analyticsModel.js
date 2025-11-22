import { db } from "../config/db.js";

export const AnalyticsModel = {
  getSummary() {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT 
          COUNT(*) AS totalRentals,
          SUM(cost) AS totalRevenue,
          SUM(distance) AS totalDistance
        FROM rentals`,
        [],
        (err, row) => (err ? reject(err) : resolve(row))
      );
    });
  },

  getUsageByStation(stationId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT 
          id, vehicleId, startTime, endTime, distance, cost
         FROM rentals
         WHERE stationId = ?`,
        [stationId],
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });
  }
};
