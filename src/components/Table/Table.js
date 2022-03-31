import clsx from "clsx";
import React from "react";

const Table = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <table ref={ref} className={clsx("min-w-full", className)} {...rest} />
  );
});

Table.thead = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <thead
      ref={ref}
      className={clsx("bg-nuvo-dark-cream", className)}
      {...rest}
    />
  );
});
Table.thead.displayName = "Table.thead";

Table.th = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <th
      ref={ref}
      scope="col"
      className={clsx(
        "group px-3 py-4 text-left text-xs font-medium uppercase tracking-wider text-nuvo-steel  hover:bg-nuvo-blue/5",
        className
      )}
      {...rest}
    >
      <div className="flex items-center justify-between group-hover:text-gray-700">
        {children}
      </div>
    </th>
  );
});
Table.th.displayName = "Table.th";

Table.tbody = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <tbody
      ref={ref}
      className={clsx("divide-y divide-neutral-700/5 bg-white ", className)}
      {...rest}
    />
  );
});
Table.tbody.displayName = "Table.tbody";

Table.tr = React.forwardRef((props, ref) => {
  const { isHeader = false, className, ...rest } = props;

  return (
    <tr
      ref={ref}
      className={clsx(
        {
          "hover:bg-nuvo-blue/5": !isHeader,
        },
        className
      )}
      {...rest}
    />
  );
});
Table.tr.displayName = "Table.tr";

Table.td = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return <td ref={ref} className={clsx("px-3 py-6 ", className)} {...rest} />;
});
Table.td.displayName = "Table.td";

Table.SortOptions = ({ column }) =>
  column.isSorted
    ? column.isSortedDesc
      ? // <MdIcon name="MdArrowDownward" className="h-4 w-4 " />
        dw
      : // <MdIcon name="MdArrowUpward" className="h-4 w-4 " />
        up
    : // <MdIcon
      //   name="MdArrowUpward"
      //   className="h-4 w-4 opacity-0 group-hover:opacity-100"
      // />
      bt;
Table.SortOptions.displayName = "Table.SortOptions";

export default Table;
