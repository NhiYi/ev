import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStationById,
  updateStationStatus,
  clearSelected,
} from "./stationSlice";

export default function StationDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: station, loading } = useSelector(
    (state) => state.stations
  );

  useEffect(() => {
    dispatch(fetchStationById(id));

    return () => dispatch(clearSelected());
  }, [id]);

  if (loading || !station) return <p className="p-4">Đang tải...</p>;

  return (
    <div className="p-6 station-detail-page">
      <h1 className="text-2xl font-bold mb-4">{station.name}</h1>

      <p>Địa chỉ: {station.address}</p>
      <p className="mt-2">
        Trạng thái:{" "}
        <span
          className={
            station.status === "active" ? "text-green-600" : "text-red-600"
          }
        >
          {station.status}
        </span>
      </p>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() =>
          dispatch(
            updateStationStatus({
              id,
              status: station.status === "active" ? "inactive" : "active",
            })
          )
        }
      >
        Chuyển trạng thái
      </button>
    </div>
  );
}
