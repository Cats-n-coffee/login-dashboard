import axios from "axios";
import * as auth from "./auth";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.interceptors.response.use(
  (res) => res.data,
  (error) => {
    var errorMessage = "";
    if (!error.response) {
      console.log("error 500");
      errorMessage = "Sorry there's a problem with the server";
    }
    if (error.response.status === 401) {
      auth.cleanUser();
      errorMessage = "Invalid email or password";
    }

    return Promise.reject(errorMessage); //error?.response.data?.msg
  }
);

axios.interceptors.request.use((conf) => ({
  ...conf,
  withCredentials: true,
}));

export default axios;
