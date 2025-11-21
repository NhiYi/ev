import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "./stationSlice";
import StationItem from "./StationItem";
import { useNavigate } from "react-router-dom";

export default function StationListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stations, loading, error } = useSelector((state) => state.station);

  useEffect(() => {
    dispatch(fetchStations());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1>Stations</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ marginTop: "20px" }}>
        {stations.map((st) => (
          <StationItem
            key={st.id}
            station={st}
            onClick={() => navigate(`/stations/${st.id}`)}
          />
        ))}
      </ul>
    </div>
  );
}
