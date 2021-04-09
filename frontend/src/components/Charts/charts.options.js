export const options = {
  chart: {
    type: "column",
    backgroundColor: "var(--color-boxes)",
    height: 200,
  },

  xAxis: {
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
      data: [1, 2, 3, 4, 5, 6],
    },
  ],
};
