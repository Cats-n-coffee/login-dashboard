import { useQuery, useMutation, useQueryClient } from "react-query";
import { client } from "./api-client";

const conf = {
  staleTime: 29 * 60 * 1000, //milliseconds,
  cacheTime: 30 * 60 * 1000,
  retry: 0,
};

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
