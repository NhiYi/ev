import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRentals } from "./rentalSlice";
import RentalCard from "./components/RentalCard";
import { useNavigate } from "react-router-dom";

export default function RentalListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector((s) => s.rentals);

  useEffect(() => {
    dispatch(fetchRentals());
  }, []);

  if (loading) return <p className="p-4">Đang tải danh sách thuê xe...</p>;

  return (
    <div className="page container p-6">
      <h1 className="text-2xl font-bold mb-4">Rental Records</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((r) => (
          <RentalCard
            key={r.id}
            rental={r}
            onClick={() => navigate(`/rentals/${r.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
