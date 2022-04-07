const TablePagination = (props) => {
  const { tableInstance } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,

    nextQueryPage,
    previousQueryPage,
    setQueryPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <div className="pagination">
      Nuevo
      <button onClick={() => previousQueryPage()} disabled={!canPreviousPage}>
        {"<"}
      </button>{" "}
      <button onClick={() => nextQueryPage()} disabled={!canNextPage}>
        {">"}
      </button>{" "}
      <span>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{" "}
      </span>
      <select
        value={pageSize}
        onChange={(e) => {
          setQueryPageSize(Number(e.target.value));
        }}
      >
        {[1, 2, 5, 10].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TablePagination;
