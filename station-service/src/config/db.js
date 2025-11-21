import sqlite3 from "sqlite3";
import dotenv from "dotenv";
dotenv.config();

sqlite3.verbose();

// Kết nối DB
export const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
  if (err) {
    console.error("SQLite error:", err);
  } else {
    console.log("SQLite connected (Station Service)");
  }
});

// Tạo bảng
db.serialize(() => {
  // Bảng trạm
  db.run(`
    CREATE TABLE IF NOT EXISTS stations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      location TEXT
    )
  `);

  // Bảng xe
  db.run(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stationId INTEGER,
      name TEXT,
      status TEXT,
      FOREIGN KEY (stationId) REFERENCES stations(id)
    )
  `);

  // Bảng chuyển xe giữa trạm
  db.run(`
    CREATE TABLE IF NOT EXISTS vehicle_transfers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vehicleId INTEGER,
      fromStation INTEGER,
      toStation INTEGER,
      staffId INTEGER,
      note TEXT,
      createdAt TEXT DEFAULT (datetime('now'))
    )
  `);

  console.log("Station-service tables ready");
});
