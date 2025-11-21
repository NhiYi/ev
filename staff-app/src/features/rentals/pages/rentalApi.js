import axiosClient from "../../utils/axiosClient";

const rentalApi = {
  getRentals: () => axiosClient.get("/staff/rentals"),

  getRental: (id) => axiosClient.get(`/staff/rentals/${id}`),

  updateStatus: (id, status) =>
    axiosClient.patch(`/staff/rentals/${id}/status`, { status }),
};

export default rentalApi;
