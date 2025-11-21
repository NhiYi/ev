// vehicleApi.js
import api from '../../utils/axiosClient';

const vehicleApi = {
  getVehicles(params) {
    return api.get('/vehicles', { params });
  },
  getById(id) {
    return api.get(`/vehicles/${id}`);
  },
  create(payload) {
    return api.post('/vehicles', payload);
  },
  update(id, payload) {
    return api.put(`/vehicles/${id}`, payload);
  },
  delete(id) {
    return api.delete(`/vehicles/${id}`);
  },
  updateStatus(id, status) {
    return api.put(`/vehicles/${id}/status`, { status });
  },
  checkIn(id, payload) {
    return api.post(`/vehicles/${id}/checkin`, payload);
  },
  checkOut(id, payload) {
    return api.post(`/vehicles/${id}/checkout`, payload);
  },
  uploadImage(id, file) {
    const fd = new FormData();
    fd.append('file', file);
    return api.post(`/vehicles/${id}/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  }
};

export default vehicleApi;
