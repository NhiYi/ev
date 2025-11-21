// stationApi.js
import api from '../../utils/axiosClient';

const stationApi = {
  getStations(params) {
    return api.get('/stations', { params });
  },
  getStation(id) {
    return api.get(`/stations/${id}`);
  },
  createStation(payload) {
    return api.post('/stations', payload);
  },
  updateStation(id, payload) {
    return api.put(`/stations/${id}`, payload);
  },
  deleteStation(id) {
    return api.delete(`/stations/${id}`);
  },
  updateStatus(id, status) {
    return api.put(`/stations/${id}/status`, { status });
  },
  uploadImage(id, file) {
    const fd = new FormData();
    fd.append('file', file);
    return api.post(`/stations/${id}/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  }
};

export default stationApi;
