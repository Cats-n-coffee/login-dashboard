// eslint-disable-next-line
import styled from "styled-components/macro";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ChartWrapper } from "./styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// const fetchDashApi = () => {
//   fetch(`${process.env.REACT_APP_BASE_URL}/dashboard`, {
//     credentials: "include",
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data.data.graph.revenus));
// };

const options = {
  chart: {
    type: "spline",
    backgroundColor: "var(--color-boxes)",
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
  const [dataset, setDataset] = useState([]); //set state with data to be used in useEffect
  // eslint-disable-next-line
  const { data, error } = useQuery("chartData", () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/dashboard`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => dataArray(data.data.graph.revenus));
  });

  // outputs an array with only the values
  const dataArray = (data) => {
    return setDataset(Object.values(data));
  };

  useEffect(() => {
    console.log(dataset);
  }, [dataset]);

  return (
    <div
      css={`
        height: auto;
        line-height: 0;
        width: 100%;
        ${ChartWrapper}
      `}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
