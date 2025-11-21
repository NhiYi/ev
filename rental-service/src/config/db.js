import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./rental.db", (err) => {
  if (!err) console.log("SQLite connected (Rental Service) ./rental.db");
});

db.run(`
  CREATE TABLE IF NOT EXISTS rentals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    vehicleId INTEGER,
    stationId INTEGER,

    startTime TEXT,
    endTime TEXT,

    distanceKm REAL DEFAULT 0,
    durationMinutes INTEGER DEFAULT 0,

    deposit REAL DEFAULT 0,
    depositStatus TEXT DEFAULT 'pending',

    handoverImages TEXT,
    contractFile TEXT,

    status TEXT DEFAULT 'created',
    createdAt TEXT
  )
`);
