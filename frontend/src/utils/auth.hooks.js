import { useQuery, useMutation, useQueryClient } from "react-query";
//import Cookies from "js-cookie";

const conf = {
  staleTime: 29 * 60 * 1000, //milliseconds,
  cacheTime: 30 * 60 * 1000,
  retry: 0,
};

// const conf = {
//   jwt: process.env.REACT_APP_JWT_KEY,
//   refresh: process.env.REACT_APP_REFRESH_KEY,
//   user: process.env.REACT_APP_USER_KEY,
// };
export function getUser() {
  return client({ endpoint: "auth/token", data: null, method: "GET" });
}

export function useGetUser() {
  const queryClient = useQueryClient();

  return useQuery(["user"], getUser, {
    ...conf,
    onError: () => queryClient.setQueryData(["user"], null),
  });
}

export function useLogin() {
  return useMutation((data) =>
    client({
      endpoint: "auth/login",
      data,
      method: "POST",
    })
  );
}

export function useRegister() {
  return useMutation((data) =>
    client({
      endpoint: "auth/register",
      data,
      method: "POST",
    })
  );
}

export function useLogout() {
  // this is GET why we use useQuery?
  const queryClient = useQueryClient();
  return useMutation(
    () => client({ endpoint: "auth/logout", data: null, method: "GET" }),
    {
      ...conf,
      onSuccess: () => (window.location.href = "/login"),
      onError: async () => {
        await queryClient.refetchQueries(["user"]);
      },
    }
  );
}

const authURL = process.env.REACT_APP_BASE_URL;

async function client({ endpoint, data, method }) {
  const config = {
    method: method,
    origin: true,
    credentials: "include",
    body: data ? JSON.stringify(data) : undefined,
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
        //useGetUser(); // handle the 401 after jwt is gone?
        return new Promise((resolve, reject) => {
          fetch("auth/token")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        });
      } else {
        return Promise.reject(data);
      }
    });
}
