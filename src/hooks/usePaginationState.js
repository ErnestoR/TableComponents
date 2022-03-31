import { useMemo, useReducer } from "react";

const initialState = {
  queryPageIndex: 0,
  queryPageSize: 2,
};

export const PAGE_CHANGED = "PAGE_CHANGED";
export const PAGE_SIZE_CHANGED = "PAGE_SIZE_CHANGED";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
        queryPageIndex: 0,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export const usePaginationState = () => {
  const [{ queryPageIndex, queryPageSize }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function setQueryPageIndex(queryPageIndex) {
    dispatch({
      payload: queryPageIndex,
      type: PAGE_CHANGED,
    });
  }

  function setQueryPageSize(queryPageSize) {
    dispatch({
      type: PAGE_SIZE_CHANGED,
      payload: queryPageSize,
    });
  }

  function nextQueryPage() {
    setQueryPageIndex(queryPageIndex + 1);
  }

  function previousQueryPage() {
    setQueryPageIndex(queryPageIndex - 1);
  }

  function useControlledState(state) {
    return useMemo(
      () => ({
        ...state,
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
      }),
      [state, queryPageIndex, queryPageSize]
    );
  }

  function getPaginationProps() {
    return {
      useControlledState,
      nextQueryPage,
      previousQueryPage,
      setQueryPageSize,
    };
  }

  return {
    pageIndex: queryPageIndex,
    pageSize: queryPageSize,
    setQueryPageIndex,
    setQueryPageSize,
    nextQueryPage,
    previousQueryPage,
    getPaginationProps,
    dispatch,
  };
};
