import React from "react";
import styled from "styled-components/macro";
import * as d3 from "d3";
import { ChartWrapper } from "./styles";

export const ChartActivity = (props) => {
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
