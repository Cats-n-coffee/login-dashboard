import React from "react";
import { Table } from "antd";
import { useQuery } from "react-query";
import "antd/dist/antd.css";
// eslint-disable-next-line
import styled from "styled-components/macro";

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
                  letter-spacing: 0.05rem;
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

        .ant-pagination-prev,
        .ant-pagination-next {
          color: var(--color-text);

          button {
            background-color: var(--color-boxes);
            border: 1px solid var(--color-text);

            path {
              fill: var(--color-text);
            }
          }

          &:hover {
            button {
              color: var(--color-titles);
              border-color: var(--color-titles);

              path {
                fill: var(--color-titles);
              }
            }
          }
        }

        .ant-pagination-disabled {
          color: var(--color-text);
          border-color: var(--color-text);
          opacity: 0.4;

          &:hover {
            button {
              border-color: var(--color-text);

              path {
                fill: var(--color-text);
              }
            }
          }
        }

        .ant-pagination-item {
          background-color: var(--color-boxes);
          border: 1px solid var(--c30);
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 0;

          a {
            color: var(--color-text);
          }

          &:hover {
            a {
              color: var(--color-titles);
            }
          }
        }

        .ant-pagination-item-active {
          &:hover {
            border-color: var(--color-titles);
          }
        }
      `}
    />
  );
};
