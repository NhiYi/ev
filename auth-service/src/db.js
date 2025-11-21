import sqlite3 from "sqlite3";
import dotenv from "dotenv";
dotenv.config();

sqlite3.verbose();

export const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
  if (err) console.error("SQLite Error:", err);
  else console.log("SQLite connected (Auth Service)");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'renter',
      licenseImage TEXT,
      cccdImage TEXT,
      isVerified INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS staff_verify_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      staffId INTEGER,
      userId INTEGER,
      timestamp TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS staff(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )`);

});
