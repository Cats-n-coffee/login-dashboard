// eslint-disable-next-line
import styled from "styled-components/macro";
import React, { useEffect, useState } from "react";
import { ChartWrapper } from "./styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { medium } from "../../styles/media-queries";
import { useChartQuery } from "./charts.hooks";
import { options } from "./charts.options";

export const BarChart = (props) => {
  const [categories, setCategories] = useState([]); // set categories for xAxis
  const [dataset, setDataset] = useState([]); //set state with data to be used in useEffect
  const [chartOptions, setChartOptions] = useState(options); //set chart options when data is fetched

  const { data, status } = useChartQuery();

  useEffect(() => {
    if (status === "success" && data) {
      setCategories(Object.keys(data.data.graph.revenus));
      setDataset(Object.values(data.data.graph.revenus));
    }
  }, [status, data]);

  useEffect(() => {
    console.log("bar", dataset);

    setChartOptions({
      ...options,
      chart: {
        type: "bar",
        backgroundColor: "var(--color-boxes)",
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
        text: "Revenus in bars",
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
        height: 100%;

        ${medium} {
          width: 100%;

          [data-highcharts-chart] {
            width: 100%;
            max-width: unset;
            height: 100%;

            .highcharts-container {
              width: 100%;
              height: 100%;
            }
          }
        }
      `}
    >
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ChartWrapper>
  );
};
