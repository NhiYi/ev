import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "./dashboardSlice";
import DashboardCard from "./DashboardCard";
import DashboardChart from "./DashboardChart";
import { FaBicycle, FaUsers, FaClock } from "react-icons/fa";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, []);

  if (loading) return <p className="p-4">Đang tải...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="dashboard-page p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Staff</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <DashboardCard
          title="Xe đang hoạt động"
          value={stats?.activeVehicles || 0}
          icon={<FaBicycle />}
        />
        <DashboardCard
          title="Người đang thuê"
          value={stats?.activeRenters || 0}
          icon={<FaUsers />}
        />
        <DashboardCard
          title="Lượt thuê hôm nay"
          value={stats?.todayRentals || 0}
          icon={<FaClock />}
        />
      </div>

      <DashboardChart
        labels={stats?.chart?.labels || []}
        data={stats?.chart?.values || []}
      />
    </div>
  );
}
