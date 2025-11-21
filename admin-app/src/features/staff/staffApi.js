// staffApi.js
import api from '../../utils/axiosClient';

const staffApi = {
  list(params) {
    return api.get('/staff', { params });
  },
  get(id) {
    return api.get(`/staff/${id}`);
  },
  create(payload) {
    return api.post('/staff', payload);
  },
  update(id, payload) {
    return api.put(`/staff/${id}`, payload);
  },
  delete(id) {
    return api.delete(`/staff/${id}`);
  },
  setRole(id, role) {
    return api.put(`/staff/${id}/role`, { role });
  }
};

export default staffApi;
