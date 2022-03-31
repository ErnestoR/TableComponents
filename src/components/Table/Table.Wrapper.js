import Table from ".";

const TableWrapper = (props) => {
  const { query, tableInstance } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    setAllFilters,
    state,
  } = tableInstance;

  console.log(tableInstance);

  return (
    <Table {...getTableProps()}>
      <Table.thead>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <Table.tr isHeader {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // eslint-disable-next-line react/jsx-key
              <Table.th
                {...column.getHeaderProps(
                  column.canSort && column.getSortByToggleProps()
                )}
              >
                {column.render("Header")}
                {column.canSort && <Table.SortOptions column={column} />}
              </Table.th>
            ))}
          </Table.tr>
        ))}
      </Table.thead>
      <Table.tbody {...getTableBodyProps()}>
        {query.isFetching ? (
          <Table.tr>
            <Table.td colSpan="7" className=" h-24 ">
              <Spinner />
            </Table.td>
          </Table.tr>
        ) : page.length === 0 ? (
          <Table.tr>
            <Table.td colSpan="7" className=" h-24 ">
              <div className="flex flex-col items-center justify-center py-10 ">
                <motion.div
                  animate={{
                    rotate: [-5, 2, 0, -5],
                    transition: {
                      delay: 0.3,
                      repeat: Infinity,
                      duration: 0.5,
                    },
                  }}
                >
                  <Iconography name="insurance" />
                </motion.div>
                <p>
                  <Text color="forest">{"no-results-found"}</Text>
                </p>
                <p>
                  <Text color="steel">{"generic-not-found-text"}</Text>
                </p>
              </div>
            </Table.td>
          </Table.tr>
        ) : (
          page.map((row) => {
            prepareRow(row);

            return (
              // eslint-disable-next-line react/jsx-key
              <Table.tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Table.td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </Table.td>
                  );
                })}
              </Table.tr>
            );
          })
        )}
      </Table.tbody>
    </Table>
  );
};

export default TableWrapper;
