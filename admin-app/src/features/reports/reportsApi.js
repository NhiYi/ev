// reportsApi.js
import api from '../../utils/axiosClient';

const reportsApi = {
  revenueByStation(params) {
    return api.get('/analytics/revenue-by-station', { params });
  },
  usageOverview(params) {
    return api.get('/analytics/usage-overview', { params });
  },
  rentalsTrend(params) {
    return api.get('/analytics/rentals-trend', { params });
  },
  adminSummary() {
    return api.get('/analytics/admin-summary');
  }
};

export default reportsApi;
