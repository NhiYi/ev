// customersApi.js
import api from '../../utils/axiosClient';

const customersApi = {
  list(params) {
    return api.get('/customers', { params });
  },
  get(id) {
    return api.get(`/customers/${id}`);
  },
  ban(id) {
    return api.post(`/customers/${id}/ban`);
  },
  unban(id) {
    return api.post(`/customers/${id}/unban`);
  }
};

export default customersApi;
