// eslint-disable-next-line
import styled from "styled-components/macro";
import React, { useEffect, useState } from "react";
import { ChartWrapper } from "./styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useChartQuery } from "./charts.hooks";

const options = {
  chart: {
    type: "spline",
    backgroundColor: "var(--color-boxes)",
  },

  xAxis: {
    labels: {
      style: {
        color: "var(--color-text)",
      },
    },
    tickLength: 0,
  },

  yAxis: {
    gridLineColor: "var(--color-boxes)",
    labels: {
      style: {
        color: "var(--color-text)",
      },
    },
    title: {
      style: {
        color: "var(--color-text)",
      },
    },
    lineWidth: 1,
  },

  legend: {
    enabled: false,
  },

  plotOptions: {
    series: {
      color: "var(--color-titles)",
    },
  },

  title: {
    text: "my chart",
  },

  series: [
    {
      data: [1, 2, 3, 4, 5, 6],
    },
  ],
};

export const ChartRevenus = (props) => {
  const [categories, setCategories] = useState([]); // set categories for xAxis
  const [dataset, setDataset] = useState([]); //set state with data to be used in useEffect
  const [chartOptions, setChartOptions] = useState(options); //set chart options when data is fetched

  const { data, status } = useChartQuery();

  useEffect(() => {
    if (status === "success" && data) {
      setCategories(Object.keys(data.data.graph.revenus));
      setDataset(Object.values(data.data.graph.revenus));
    }
    if (["loading", "idle"].includes(status)) {
      return (
        <div
          css={`
            position: fixed;
            top: 0;
            width: 100%;
            height: 100%;
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
    return () => {};
  }, [status, data]);

  useEffect(() => {
    console.log("revenus", dataset);

    setChartOptions({
      chart: {
        type: "spline",
        backgroundColor: "var(--color-boxes)",
        height: 200,
        styledMode: true,
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

      yAxis: {
        gridLineColor: "var(--color-boxes)",
        labels: {
          style: {
            color: "var(--color-text)",
          },
        },
        title: {
          enabled: false,
          style: {
            color: "var(--color-text)",
          },
        },
        lineWidth: 1,
      },

      legend: {
        enabled: false,
      },

      plotOptions: {
        series: {
          color: "var(--color-titles)",
        },
      },

      title: {
        text: "Revenus in Line",
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

  return (
    <div
      css={`
        ${ChartWrapper}
      `}
    >
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
