import { usePagination, useTable } from "react-table";
import { usePaginationState } from "./usePaginationState";

export const useTableQueryPagination = (
  queryHook,
  tableConfig,
  ...tablePlugins
) => {
  const { pageIndex, pageSize, getPaginationProps } = usePaginationState();
  const query = queryHook({ pageIndex, pageSize });

  const tableInstance = useTable(
    {
      ...tableConfig,
      data: query?.data?.loads || [],
      manualPagination: true,
      initialState: {
        pageIndex,
        pageSize,
      },
      pageCount: query.isSuccess ? query.data?.metadata?.totalPages : null,
      ...getPaginationProps(),
    },
    ...tablePlugins,
    usePagination
  );

  return {
    query,
    tableInstance,
  };
};
