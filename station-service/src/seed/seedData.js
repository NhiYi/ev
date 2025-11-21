import { db } from "../config/db.js";

export const seedData = () => {
  db.serialize(() => {
    db.run(`INSERT INTO stations(name, location) VALUES 
      ('Station A', 'District 1'),
      ('Station B', 'District 7')
    `);

    db.run(`INSERT INTO vehicles(stationId, name, status) VALUES
      (1, 'E-Bike 01', 'available'),
      (1, 'E-Bike 02', 'available'),
      (1, 'E-Scooter 03', 'maintenance'),
      (2, 'E-Bike 04', 'available'),
      (2, 'E-Scooter 05', 'rented')
    `);

    console.log("Seeded Station + Vehicles");
  });
};
