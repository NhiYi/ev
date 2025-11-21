import React from "react";

export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="p-4 shadow rounded bg-white flex items-center gap-3 dashboard-card">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-600">{title}</h4>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
