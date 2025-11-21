import React from "react";

export default function VehicleCard({ vehicle, onBook, onCheck }) {
  return (
    <div className="card p-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{vehicle.model || vehicle.name}</div>
          <div className="text-sm text-gray-600">Battery: {vehicle.battery ?? vehicle.batteryLevel}%</div>
          <div className="text-sm">Status: {vehicle.status}</div>
        </div>
        <div className="flex flex-col gap-2">
          {onBook && <button className="btn primary" onClick={() => onBook(vehicle.id)}>Book</button>}
          {onCheck && <button className="btn" onClick={() => onCheck(vehicle.id)}>Check</button>}
        </div>
      </div>
    </div>
  );
}
