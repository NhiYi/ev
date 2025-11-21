import React from "react";

export default function StationItem({ station, onClick }) {
  return (
    <div
      className="p-4 bg-white rounded shadow station-item cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold">{station.name}</h3>
      <p className="text-gray-600">{station.address}</p>
      <p className="mt-2 font-bold">
        Trạng thái:{" "}
        <span
          className={
            station.status === "active" ? "text-green-600" : "text-red-600"
          }
        >
          {station.status}
        </span>
      </p>
    </div>
  );
}
