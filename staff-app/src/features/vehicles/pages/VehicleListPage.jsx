import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "./vehicleSlice";
import VehicleCard from "./VehicleCard";
import { useNavigate } from "react-router-dom";

export default function VehicleListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector(state => state.vehicles);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, []);

  if (loading) return <p className="p-4">Đang tải danh sách xe...</p>;

  return (
    <div className="page container p-6">
      <h1 className="text-2xl font-bold mb-4">Vehicles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(v => (
          <div key={v.id} onClick={() => navigate(`/stations/${v.stationId}/vehicles/${v.id}`)}>
            <VehicleCard vehicle={v}/>
          </div>
        ))}
      </div>
    </div>
  );
}
