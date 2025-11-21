import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const initUserModel = async () => {
  const db = await open({
    filename: "./src/database/users.db",  // <== PATH CHUẨN
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      email TEXT UNIQUE,
      password TEXT,
      phone TEXT,
      role TEXT DEFAULT 'renter',
      cccdImage TEXT,
      licenseImage TEXT,
      verified INTEGER DEFAULT 0
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS staff_verify_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      staffId INTEGER,
      userId INTEGER,
      timestamp TEXT
    );
  `);

  return db;
};
