import React, { useState } from "react";
import { Table } from "antd";
import { useQuery } from "react-query";
import "antd/dist/antd.css";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    name: "date",
  },
  {
    title: "Items",
    dataIndex: "items",
    name: "items",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    name: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
    name: "status",
  },
];

export const TableDashboard = (props) => {
  const [dataset, setDataset] = useState([]);
  // eslint-disable-next-line
  const { data, error } = useQuery("tableData", () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/dashboard`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setDataset(data.data.table);
      });
  });

  return <Table dataSource={dataset} columns={columns} />;
};
