import React from "react";
import { Line } from "react-chartjs-2";

export default function DashboardChart({ labels, data }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Số lượt thuê",
        data,
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Biểu đồ lượt thuê</h3>
      <Line data={chartData} />
    </div>
  );
}
