// eslint-disable-next-line
import styled from "styled-components/macro";
import * as React from "react";
import TopPanel from "components/TopPanel";
import { medium } from "../styles/media-queries";
import { ChartRevenus } from "components/Charts/ChartRevenus";
import { ChartSales } from "components/Charts/ChartSales";
import { ChartActivity } from "components/Charts/ChartActivity";
import { TableDashboard } from "components/Table/index";

export default function DashboardScreen() {
  React.useEffect(() => {
    document.body.style.background = "var(--color-background)";
  }, []);

  return (
    <div
      css={`
        height: 100vh;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto 1fr;
      `}
    >
      <TopPanel />
      <div
        css={`
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: repeat(3, auto);
          grid-template-areas:
            "top-row"
            "bar"
            "table";
          padding: 0.5em;

          ${medium} {
            grid-template-columns: repeat(3, auto);
            grid-template-rows: repeat(2, auto);
            grid-template-areas:
              "top-row top-row top-row"
              "bar table table";
          }
        `}
      >
        <div
          className="top-row"
          css={`
            grid-area: top-row;
            display: flex;
            flex-wrap: wrap;
          `}
        >
          <ChartRevenus />
          <ChartSales />
          <ChartActivity />
        </div>
        <div className="bar-chart"></div>
        <div className="table">
          <TableDashboard />
        </div>
      </div>
    </div>
  );
}
