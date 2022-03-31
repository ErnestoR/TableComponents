const TableQuery = (props) => {
  const { children, query } = props;

  const queryResponse = query();

  console.log(queryResponse);

  return <div>{children}</div>;
};

export default TableQuery;
