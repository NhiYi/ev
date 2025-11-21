import React from "react";

export default function RentalCard({ rental, onClick }) {
  return (
    <div
      className="card p-4 cursor-pointer hover:shadow"
      onClick={onClick}
    >
      <div className="font-bold">Rental #{rental.id}</div>
      <div className="text-sm">User: {rental.userName}</div>
      <div className="text-sm">Vehicle: {rental.vehicleName}</div>
      <div className="text-sm">Status: {rental.status}</div>
      <div className="text-sm text-gray-600">Start: {rental.startTime}</div>
    </div>
  );
}
