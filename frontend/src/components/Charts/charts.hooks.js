import { client } from "utils/api-client";
import { useQuery } from "react-query";

const conf = {
  staleTime: 29 * 60 * 1000, //milliseconds,
  cacheTime: 30 * 60 * 1000,
  retry: 2,
};

export function queryDash() {
  return client({ endpoint: "dashboard", data: null, method: "GET" });
}

export function useChartQuery() {
  return useQuery(["dashboard"], queryDash, {
    ...conf,
  });
}
