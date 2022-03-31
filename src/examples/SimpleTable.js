import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTable } from "react-table";
import qs from "qs";

import Table from "../components/Table";

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
        Header: "Column 1",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  return (
    <Table.Query query={useLoads} columns={columns}>
      <Table.Wrapper />
    </Table.Query>
  );
};

export default SimpleTable;
