import axios from "./axios";
import Cookies from "js-cookie";

const conf = {
  jwt: process.env.REACT_APP_JWT_KEY,
  refresh: process.env.REACT_APP_REFRESH_KEY,
};

export function login({ email, password }) {
  console.log("login", { email, password });
  return axios.post("/login", { email, password });
}

export function register({ username, email, password }) {
  return axios.post("/signup", { username, email, password });
}

export function logout() {
  return axios.get("/logout", { headers: {} });
}

export function getUser() {
  const refreshToken = Cookies.get(conf.refresh);
  console.log(refreshToken);
  if (!refreshToken) return Promise.resolve(null);
  return axios.post("/refreshtoken", { refresh_token: refreshToken });
}
