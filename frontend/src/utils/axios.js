import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
);

axios.interceptors.request.use((conf) => ({
  ...conf,
  withCredentials: true,
}));

export default axios;
