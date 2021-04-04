// eslint-disable-next-line
import styled from "styled-components/macro";
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

  return (
    <Table
      dataSource={dataset}
      columns={columns}
      css={`
        .ant-table {
          color: var(--color-text);
          background: var(--color-boxes);
          border-radius: 6px;
        }

        .ant-table-content {
          table {
            border-radius: 6px;

            .ant-table-thead {
              tr {
                th {
                  color: var(--color-titles);
                  background: var(--color-boxes);
                  border-bottom: 1px solid var(--color-text);
                }
              }
            }

            .ant-table-tbody {
              tr {
                td {
                  border-bottom: 1px solid var(--c30);
                }
              }
            }
            .ant-table-tbody > tr.ant-table-row:hover > td {
              background: none;
            }
          }
        }
      `}
    />
  );
};
