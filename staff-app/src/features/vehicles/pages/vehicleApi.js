import axiosClient from "../../../utils/axiosClient";

// Note: API paths assumed proxied by gateway; adjust if needed.
const vehicleApi = {
  getVehicles: () => axiosClient.get("/staff/vehicles"), // or /staff/stations/:id/vehicles
  getVehicle: (stationId, vehicleId) => axiosClient.get(`/staff/stations/${stationId}/vehicles/${vehicleId}`),
  updateStatus: (vehicleId, status) => axiosClient.patch(`/vehicles/${vehicleId}/status`, { status }),
  checkIn: (vehicleId, payload) => {
    // payload may be FormData including images
    return axiosClient.post(`/vehicles/${vehicleId}/checkin`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  checkOut: (vehicleId, payload) => {
    return axiosClient.post(`/vehicles/${vehicleId}/checkout`, payload);
  },
};

export default vehicleApi;
