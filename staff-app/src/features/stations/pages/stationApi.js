import axiosClient from "../../../utils/axiosClient";

const stationApi = {
  getStations: () => axiosClient.get("/staff/stations"),
  getStation: (id) => axiosClient.get(`/staff/stations/${id}`),
  updateStatus: (id, status) =>
    axiosClient.patch(`/staff/stations/${id}`, { status }),
};

export default stationApi;
