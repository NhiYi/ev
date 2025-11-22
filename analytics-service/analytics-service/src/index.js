import express from "express";
import cors from "cors";
import { db } from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4004;

/* ===========================
    1) Log event
=========================== */
app.post("/analytics/event", (req, res) => {
  const { type, payload } = req.body;

  db.run(
    "INSERT INTO events (type, payload) VALUES (?, ?)",
    [type, JSON.stringify(payload)],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ message: "Event logged" });
    }
  );
});

/* ===========================
    2) Revenue by station
=========================== */
app.get("/analytics/revenue-by-station", (req, res) => {
  const query = `
    SELECT 
      json_extract(payload, '$.stationId') AS stationId,
      SUM(json_extract(payload, '$.amount')) AS revenue
    FROM events
    WHERE type = 'payment.completed'
    GROUP BY stationId
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/* ===========================
    3) Top active vehicles
=========================== */
app.get("/analytics/top-vehicles", (req, res) => {
  const query = `
    SELECT 
      json_extract(payload, '$.vehicleId') AS vehicleId,
      COUNT(*) AS usageCount
    FROM events
    WHERE type = 'rental.started'
    GROUP BY vehicleId
    ORDER BY usageCount DESC
    LIMIT 10
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/* ===========================
    4) Heatmap rental time
=========================== */
app.get("/analytics/heatmap", (req, res) => {
  const query = `
    SELECT 
      strftime('%H', createdAt) AS hour,
      COUNT(*) AS rentals
    FROM events
    WHERE type = 'rental.started'
    GROUP BY hour
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/* ===========================
    5) Staff performance
=========================== */
app.get("/analytics/staff-performance", (req, res) => {
  const query = `
    SELECT 
      json_extract(payload, '$.staffId') AS staffId,
      COUNT(*) AS actions
    FROM events
    WHERE type = 'staff.action'
    GROUP BY staffId
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log("Analytics Service running on port " + PORT);
});
