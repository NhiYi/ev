import sqlite3 from "sqlite3";
import dotenv from "dotenv";
dotenv.config();

sqlite3.verbose();

export const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
  if (err) console.error("SQLite error:", err);
  else console.log("SQLite connected (Staff Service)");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS staff (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'staff',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS staff_actions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      staffId INTEGER,
      action TEXT,
      details TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (staffId) REFERENCES staff(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS vehicle_transfers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vehicleId INTEGER,
      fromStation INTEGER,
      toStation INTEGER,
      staffId INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

});
