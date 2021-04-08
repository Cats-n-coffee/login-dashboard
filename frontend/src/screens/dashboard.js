// eslint-disable-next-line
import styled from "styled-components/macro";
import * as React from "react";
import TopPanel from "components/TopPanel";
import { medium, xlarge } from "../styles/media-queries";
import { ChartRevenus } from "components/Charts/ChartRevenus";
import { ChartSales } from "components/Charts/ChartSales";
import { ChartActivity } from "components/Charts/ChartActivity";
import { TableDashboard } from "components/Table/index";
import { BarChart } from "components/Charts/BarChart";

export default function DashboardScreen() {
  React.useEffect(() => {
    document.body.style.background = "var(--color-background)";
  }, []);

  return (
    <div
      css={`
        min-height: 100vh;
        width: 100%;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto 1fr;
        max-width: 1400px;
        margin: 0 auto;

        ${xlarge} {
          max-height: 100vh;
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: 6vh 94vh;
        }
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
          place-items: center;
          grid-row-gap: 10px;
          padding: 0.5em;

          ${medium} {
            grid-template-columns: repeat(3, auto);
            grid-template-rows: repeat(2, auto);
            grid-template-areas:
              "top-row top-row top-row"
              "bar table table";
            grid-column-gap: 10px;
          }

          ${xlarge} {
            grid-template-columns: repeat(3, auto);
            grid-template-rows: 25vh 66vh;
            grid-template-areas:
              "top-row top-row top-row"
              "bar table table";
            grid-column-gap: 10px;
          }
        `}
      >
        <div
          className="top-row"
          css={`
            grid-area: top-row;
            width: 100%;
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: repeat(3, auto);
            grid-row-gap: 5px;

            ${medium} {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: auto;
              grid-column-gap: 10px;
              grid-row-gap: unset;
            }
          `}
        >
          <ChartRevenus />
          <ChartSales />
          <ChartActivity />
        </div>
        <div
          className="bar-chart"
          css={`
            grid-area: bar;
            width: 100%;

            ${medium} {
              width: 32.5vw;
              height: 100%;
            }
          `}
        >
          <BarChart />
        </div>
        <div
          className="table"
          css={`
            grid-area: table;
            width: 100%;

            ${medium} {
              width: 66vw;
              height: 100%;
            }
          `}
        >
          <TableDashboard />
        </div>
      </div>
    </div>
  );
}
