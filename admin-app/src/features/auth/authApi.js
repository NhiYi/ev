// authApi.js
import api from '../../utils/axiosClient';

const authApi = {
  login(credentials) {
    return api.post('/auth/login', credentials);
  },
  refresh(token) {
    return api.post('/auth/refresh', { refreshToken: token });
  },
  logout(refreshToken) {
    return api.post('/auth/logout', { refreshToken });
  },
  me() {
    return api.get('/auth/me');
  },
};

export default authApi;
