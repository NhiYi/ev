// rentalApi.js
import api from '../../utils/axiosClient';

const rentalApi = {
  list(params) {
    return api.get('/rental', { params });
  },
  get(id) {
    return api.get(`/rental/${id}`);
  },
  create(payload) {
    return api.post('/rental', payload);
  },
  close(id, payload) {
    return api.post(`/rental/${id}/close`, payload);
  },
  refund(id, payload) {
    return api.post(`/rental/${id}/refund`, payload);
  }
};

export default rentalApi;
