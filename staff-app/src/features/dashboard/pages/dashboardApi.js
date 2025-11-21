const dashboardApi = {
  async getStats() {
    // Mock API – bạn có thể thay bằng API thật
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalRentals: 124,
          activeVehicles: 32,
          staffOnline: 5,
          rentalsPerDay: [5, 8, 12, 6, 14, 9, 11],
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        });
      }, 300);
    });
  },
};

export default dashboardApi;