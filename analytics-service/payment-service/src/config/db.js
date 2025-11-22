import { open } from "sqlite";
import sqlite3 from "sqlite3";
sqlite3.verbose();

export const db = await open({
  filename: "./payment.db",
  driver: sqlite3.Database
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rentalId INTEGER,
    userId INTEGER,
    amount REAL,
    method TEXT,
    status TEXT,
    note TEXT,
    createdAt TEXT DEFAULT (datetime('now'))
  );
`);
