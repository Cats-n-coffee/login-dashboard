// eslint-disable-next-line
import styled from "styled-components/macro";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ChartWrapper } from "./styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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

  // eslint-disable-next-line
  const { data, error } = useQuery("revenusChart", () => {
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

      // responsive: {
      //   rules : [ {
      //     condition: {
      //       maxWidth: 400,
      //     }
      //   } ]
      // },

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
      <HighchartsReact
        containerProps={{ style: { width: "100%" } }}
        constructorType={"chart"}
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};
