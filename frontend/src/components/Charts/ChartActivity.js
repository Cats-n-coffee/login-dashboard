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

export const ChartActivity = (props) => {
  const [categories, setCategories] = useState([]); // set categories for xAxis
  const [dataset, setDataset] = useState([]); //set state with data to be used in useEffect
  const [chartOptions, setChartOptions] = useState(options); //set chart options when data is fetched

  const { data } = useChartQuery();

  useEffect(() => {
    if (data) {
      setCategories(Object.keys(data.data.graph.monthly_visits));
      setDataset(Object.values(data.data.graph.monthly_visits));
    }
    return () => {};
  }, [data]);

  useEffect(() => {
    console.log("activity", dataset);

    setChartOptions({
      chart: {
        type: "column",
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
        text: "Activity per Month",
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
        height: auto;
        line-height: 0;
        width: auto;
        ${ChartWrapper}
      `}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        css={``}
      />
    </div>
  );
};
