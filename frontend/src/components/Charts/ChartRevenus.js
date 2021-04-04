// eslint-disable-next-line
import styled from "styled-components/macro";
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useQuery } from "react-query";
import { ChartWrapper } from "./styles";

// const fetchDashApi = () => {
//   fetch(`${process.env.REACT_APP_BASE_URL}/dashboard`, {
//     credentials: "include",
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data.data.graph.revenus));
// };

export const ChartRevenus = (props) => {
  const [dataset, setDataset] = useState([]); //set state with data to be used in useEffect
  // gets the data
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

  // creates the ref needed for the svg
  const svgRef = useRef();
  const width = 300;
  const height = 150;

  //   const xScale = d3.scaleLinear()
  //                   .domain()
  //                   .range(0, 300);

  useEffect(() => {
    console.log(dataset);

    const svgChart = d3.select(svgRef.current);
    svgChart
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d, i) {
        return i * 10;
      })
      .attr("width", 5)
      .attr("height", (d) => d / 2)
      .attr("fill", "yellow");

    const yScale = d3.scaleLinear().domain([1200, 2500]).range([0, 300]);
    const yAxis = d3.axisBottom(yScale);
    //.scale(yScale)

    svgChart
      .append("g")
      .attr("transform", "translate(0, 150)")
      .call(yAxis)
      .style("stroke", "white");
    svgChart.selectAll(".domain").attr("stroke", "white");
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
      <svg viewBox="0 0 300 150" ref={svgRef} />
    </div>
  );
};

//Chrome issue?

//To set up the editor integration, add something like REACT_EDITOR=atom to the .env.local file in your project folder and restart the development server. Learn more: https://goo.gl/MMTaZt
