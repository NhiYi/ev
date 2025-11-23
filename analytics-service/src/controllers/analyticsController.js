import { db } from "../config/db.js";

export const logEvent = (req, res) => {
  const { type, payload } = req.body;

  db.run(
    `INSERT INTO events (type, payload) VALUES (?, ?)`,
    [type, JSON.stringify(payload)],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: "Event logged" });
    }
  );
};

// =======================
// Revenue by station
// =======================
export const revenueByStation = (req, res) => {
  db.all(
    `SELECT 
        json_extract(payload, '$.stationId') AS stationId,
        SUM(json_extract(payload, '$.amount')) AS totalRevenue
     FROM events
     WHERE type = 'payment.completed'
     GROUP BY stationId`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

// =======================
// Top active vehicles
// =======================
export const topVehicles = (req, res) => {
  db.all(
    `SELECT
        json_extract(payload, '$.vehicleId') AS vehicleId,
        COUNT(*) AS usageCount
     FROM events
     WHERE type = 'rental.started'
     GROUP BY vehicleId
     ORDER BY usageCount DESC
     LIMIT 10`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

// =======================
// Heatmap by rental time
// =======================
export const rentalHeatmap = (req, res) => {
  db.all(
    `SELECT 
        strftime('%H', createdAt) AS hour,
        COUNT(*) AS rentals
     FROM events
     WHERE type = 'rental.started'
     GROUP BY hour`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

// =======================
// Staff performance
// =======================
export const staffPerformance = (req, res) => {
  db.all(
    `SELECT
        json_extract(payload, '$.staffId') AS staffId,
        COUNT(*) AS actionCount
     FROM events
     WHERE type LIKE 'staff.%'
     GROUP BY staffId
     ORDER BY actionCount DESC`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};
