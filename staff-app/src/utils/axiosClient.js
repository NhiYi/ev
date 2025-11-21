import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
const axiosClient = axios.create({ baseURL: API_BASE, timeout: 15000 });
axiosClient.interceptors.request.use(cfg => {
  try { const raw = localStorage.getItem("staff_user"); if (raw) { const t = JSON.parse(raw).accessToken; if (t) cfg.headers.Authorization = `Bearer ${t}` } } catch(e){}
  return cfg;
});
export default axiosClient;