import axios from "axios";
import * as auth from "./auth";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response.status === 401) {
      auth.cleanUser();
      window.location.reload();
    }
    return Promise.reject(error?.response.data?.msg);
  }
);

axios.interceptors.request.use((conf) => ({
  ...conf,
  withCredentials: true,
}));

export default axios;
