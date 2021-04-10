import React from "react";
import { Table } from "antd";
import { useQuery } from "react-query";
import "antd/dist/antd.css";
import "./index.scss";

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
  const { data: dataset, status, error } = useQuery("tableData", () =>
    fetch(`${process.env.REACT_APP_BASE_URL}/dashboard`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => data?.data?.table || [])
  );

  if (["loading", "idle"].includes(status)) {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    <Table dataSource={dataset} columns={columns} rowKey={(row) => row.id} />
  );
};
