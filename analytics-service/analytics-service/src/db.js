import sqlite3 from "sqlite3";
import dotenv from "dotenv";
dotenv.config();

sqlite3.verbose();

export const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
  if (err) console.error("SQLite error:", err);
  else console.log("SQLite connected (Analytics Service)");
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      payload TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Analytics tables created");
});
