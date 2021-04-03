// eslint-disable-next-line
import styled from "styled-components/macro";
import React from "react";
import * as d3 from "d3";
import { useQuery } from "react-query";
import { ChartWrapper } from "./styles";

const fetchDashApi = () => {
  fetch(`${process.env.REACT_APP_BASE_URL}/dashboard`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const ChartRevenus = (props) => {
  const { data, error } = useQuery("chartData", fetchDashApi);

  return (
    <div
      css={`
        height: auto;
        line-height: 0;
        ${ChartWrapper}
      `}
    ></div>
  );
};
