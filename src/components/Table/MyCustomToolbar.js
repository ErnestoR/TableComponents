const MyCustomToolbar = (props) => {
  const { filterbyNam = () => {}, tableInstance } = props;

  return (
    <div>
      <div>MyCustomToolbar</div>
      <button onClick={tableInstance.nextQueryPage}>filtro 1</button>
    </div>
  );
};

export default MyCustomToolbar;
