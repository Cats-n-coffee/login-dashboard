import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
);

axios.interceptors.request.use((conf) => conf);

export default axios;
