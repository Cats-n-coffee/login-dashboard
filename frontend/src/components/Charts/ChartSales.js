// eslint-disable-next-line
import styled from "styled-components/macro";
import React, { useEffect, useState } from "react";
import { ChartWrapper } from "./styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useChartQuery } from "./charts.hooks";
import { options } from "./charts.options";

export const ChartSales = (props) => {
  const [categories, setCategories] = useState([]); // set categories for xAxis
  const [dataset, setDataset] = useState([]); //set state with data to be used in useEffect
  const [chartOptions, setChartOptions] = useState(options); //set chart options when data is fetched

  const { data, status } = useChartQuery();

  useEffect(() => {
    if (status === "success" && data) {
      setCategories(Object.keys(data.data.graph.transactions));
      setDataset(Object.values(data.data.graph.transactions));
    }
  }, [status, data]);

  useEffect(() => {
    console.log("sales", dataset);

    setChartOptions({
      ...options,
      chart: {
        type: "area",
        backgroundColor: "var(--color-boxes)",
        height: 200,
      },

      xAxis: {
        categories: categories,
        labels: {
          style: {
            color: "var(--color-text)",
          },
        },
        tickLength: 0,
        title: {
          enabled: false,
        },
      },

      title: {
        text: "Sales per Month",
        style: {
          color: "var(--color-text)",
          fontWeight: "normal",
        },
      },

      series: [
        {
          data: dataset,
        },
      ],
    });
  }, [dataset, categories]);

  if (["loading", "idle"].includes(status)) {
    return (
      <div
        css={`
          position: fixed;
          top: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
        `}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (status === "error") {
    console.log("error");
  }

  return (
    <ChartWrapper
      css={`
        height: auto;
        line-height: 0;
        width: auto;
      `}
    >
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ChartWrapper>
  );
};
