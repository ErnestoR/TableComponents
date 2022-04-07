import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTable, useSortBy } from "react-table";
import qs from "qs";

import Table from "../components/Table";
import TablePagination from "../components/Table/TablePagination";
import MyCustomToolbar from "../components/Table/MyCustomToolbar";

const useLoads = (params) => {
  const page = {
    number: params?.pageIndex,
    size: params?.pageSize,
  };

  return useQuery(
    ["carriers/loads", page?.number, page?.size],
    () =>
      axios
        .get("/carriers/loads", {
          params: {
            page,
          },
          paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: "brackets" });
          },
        })
        .then((response) => response.data),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

const SimpleTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "status",
        accessor: "status",
      },
    ],
    []
  );

  return (
    <Table.Query
      query={useLoads}
      columns={columns}
      tablePlugins={
        [
          // useSortBy
        ]
      }
    >
      <MyCustomToolbar />
      <Table.Wrapper />

      <TablePagination />
    </Table.Query>
  );
};

export default SimpleTable;
