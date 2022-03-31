import React from "react";
import { useTableQueryPagination } from "../../hooks/useTableQueryPagination";

const TableQuery = (props) => {
  const {
    children,
    columns,
    tableConfig = {},
    tablePlugins = [],
    query: queryHook,
  } = props;

  const { query, tableInstance } = useTableQueryPagination(
    queryHook,
    {
      ...tableConfig,
      columns,
    },
    ...tablePlugins
  );

  if (query.isLoading) {
    return "...loading...";
  }

  return React.Children.map(children, (child) => {
    return typeof child.type === "string"
      ? child
      : React.cloneElement(child, { query, tableInstance });
  });
};

export default TableQuery;
