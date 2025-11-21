import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initUserModel() {
  const db = await open({
    filename: "./auth.db",
    driver: sqlite3.Database
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

  return db;
}
