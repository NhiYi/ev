import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRentalById, clearSelectedRental, updateRentalStatus } from "./rentalSlice";

export default function RentalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selected: rental, loading } = useSelector((s) => s.rentals);

  useEffect(() => {
    dispatch(fetchRentalById(id));
    return () => dispatch(clearSelectedRental());
  }, [id]);

  if (loading || !rental) return <p className="p-4">Đang tải...</p>;

  const toggleStatus = () => {
    const newStatus = rental.status === "active" ? "completed" : "active";
    dispatch(updateRentalStatus({ id, status: newStatus }));
  };

  return (
    <div className="page container p-6">
      <h1 className="text-2xl font-bold mb-4">Rental #{id}</h1>

      <div className="space-y-2">
        <p><b>User:</b> {rental.userName}</p>
        <p><b>Vehicle:</b> {rental.vehicleName}</p>
        <p><b>Status:</b> {rental.status}</p>
        <p><b>Start Time:</b> {rental.startTime}</p>
        <p><b>End Time:</b> {rental.endTime || "N/A"}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="btn primary" onClick={toggleStatus}>
          Toggle Status
        </button>

        <button className="btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}
