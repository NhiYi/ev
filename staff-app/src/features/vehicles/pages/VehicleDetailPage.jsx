import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicleById, updateVehicleStatus, checkInVehicle, checkOutVehicle, clearSelectedVehicle } from "./vehicleSlice";
import FileUploader from "../../shared/FileUploader";

export default function VehicleDetailPage() {
  const { stationId, vehicleId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selected: vehicle, loading } = useSelector(state => state.vehicles);
  const [checkNotes, setCheckNotes] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(fetchVehicleById({ stationId, vehicleId }));
    return () => dispatch(clearSelectedVehicle());
  }, [stationId, vehicleId]);

  if (loading || !vehicle) return <p className="p-4">Đang tải...</p>;

  const doCheckIn = async () => {
    const fd = new FormData();
    fd.append("notes", checkNotes);
    images.forEach((f, idx) => fd.append("images", f));
    try {
      await dispatch(checkInVehicle({ vehicleId, payload: fd })).unwrap();
      alert("Check-in thành công");
      dispatch(fetchVehicleById({ stationId, vehicleId }));
    } catch (err) {
      alert("Check-in lỗi: " + (err.message || JSON.stringify(err)));
    }
  };

  const doCheckOut = async () => {
    try {
      await dispatch(checkOutVehicle({ vehicleId, payload: { notes: checkNotes } })).unwrap();
      alert("Check-out thành công");
      dispatch(fetchVehicleById({ stationId, vehicleId }));
    } catch (err) {
      alert("Check-out lỗi: " + (err.message || JSON.stringify(err)));
    }
  };

  return (
    <div className="page container p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{vehicle.model || vehicle.name}</h1>
          <p>Battery: {vehicle.battery ?? vehicle.batteryLevel}%</p>
          <p>Status: {vehicle.status}</p>
          <p>Station: {vehicle.stationName || vehicle.stationId}</p>
        </div>
        <div>
          <button className="btn" onClick={() => dispatch(updateVehicleStatus({ vehicleId, status: vehicle.status === "available" ? "maintenance" : "available" }))}>
            Toggle Maintenance
          </button>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="font-semibold mb-2">Check-in / Check-out</h3>
        <div className="mb-2">
          <textarea placeholder="Notes" value={checkNotes} onChange={e => setCheckNotes(e.target.value)} className="w-full p-2 border"/>
        </div>

        <FileUploader onFilesSelected={setImages} />
        <div className="flex gap-2 mt-3">
          <button className="btn primary" onClick={doCheckIn}>Check-in</button>
          <button className="btn" onClick={doCheckOut}>Check-out</button>
          <button className="btn" onClick={() => navigate(-1)}>Back</button>
        </div>
      </section>
    </div>
  );
}
