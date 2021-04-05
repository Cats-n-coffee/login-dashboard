import { useQuery, useMutation, useQueryClient } from "react-query";
import Cookies from "js-cookie";

// const conf = {
//     staleTime: ,
//     cacheTime: ,
//     retry: 0
// }

const conf = {
  jwt: process.env.REACT_APP_JWT_KEY,
  refresh: process.env.REACT_APP_REFRESH_KEY,
  user: process.env.REACT_APP_USER_KEY,
};

export function getCachedUser() {
  try {
    return JSON.parse(window.localStorage.getItem(conf.user));
  } catch (e) {
    return null;
  }
}

export function storeUser(userData) {
  window.localStorage.setItem(conf.user, JSON.stringify(userData));
  return userData;
}

export function cleanUser() {
  window.localStorage.removeItem(conf.user);
  return null;
}

async function useGetUser() {
  // if we were a real auth provider, this is where we would make a request
  // to retrieve the user's token. (It's a bit more complicated than that...
  // but you're probably not an auth provider so you don't need to worry about it).
  const refreshToken = Cookies.get(conf.refresh);
  if (!refreshToken) return Promise.resolve(null);
  return client("/auth/token", { refreshToken }, "GET")
    .then((userData) => storeUser(userData))
    .catch((e) => cleanUser());
}

function useLogin({ username, password }) {
  return client(
    "/auth/login",
    { username, password },
    "POST"
  ).then((userData) => storeUser(userData));
}

function useRegister({ username, password }) {
  return client(
    "/auth/register",
    { username, password },
    "POST"
  ).then((userData) => storeUser(userData));
}

async function useLogout() {
  window.localStorage.removeItem(conf.user);
  return client("/auth/logout", { username, password }, "GET").then(() =>
    cleanUser()
  );
}

// an auth provider wouldn't use your client, they'd have their own
// so that's why we're not just re-using the client
const authURL = process.env.REACT_APP_BASE_URL;

async function client(endpoint, data, method) {
  const config = {
    method: method,
    origin: true,
    credentials: "include",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      if (response.status === 401) {
        useGetUser(); // handle the 401 after jwt is gone?
      } else {
        return Promise.reject(data);
      }
    });
}

export { useGetUser, useLogin, useRegister, useLogout };
