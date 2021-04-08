// eslint-disable-next-line
import styled from "styled-components/macro";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ChartWrapper } from "./styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { medium } from "../../styles/media-queries";

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

export const BarChart = (props) => {
  const [categories, setCategories] = useState([]); // set categories for xAxis
  const [dataset, setDataset] = useState([]); //set state with data to be used in useEffect
  const [chartOptions, setChartOptions] = useState(options); //set chart options when data is fetched

  // eslint-disable-next-line
  const { data, error } = useQuery("barChart", () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/dashboard`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setDataset(Object.values(data.data.graph.revenus));
        setCategories(Object.keys(data.data.graph.revenus));
      });
  });

  useEffect(() => {
    console.log(dataset);

    setChartOptions({
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

  return (
    <div
      css={`
        ${ChartWrapper}
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
    </div>
  );
};
