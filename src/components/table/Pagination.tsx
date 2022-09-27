import { Select } from "flowbite-react";
import React from "react";

function Pagination(props: {
  page?: number;
  changePage?: (page: number) => void;
  totalPages?: number;
  totalEntries?: number;
  entriesPerPage?: number;
  changePageSize?: (size: number) => void;
}) {
  const [entries, setEntries] = React.useState({
    start: 1,
    end: 1,
  });

  const calculatePagesCount = (pageSize: number, totalCount: number) => {
    // we suppose that if we have 0 items we want 1 empty page
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
  };

  const totalPages = React.useMemo(() => {
    if (
      typeof props.totalEntries === "number" &&
      typeof props.entriesPerPage === "number"
    ) {
      return calculatePagesCount(props.entriesPerPage, props.totalEntries);
    }
    return 1;
  }, [props.totalEntries, props.entriesPerPage]);

  const onNext = () => {
    // check value is not undefine, ...
    if (props.changePage && typeof props.page === "number") {
      // check page
      if (props.page < totalPages - 1) {
        props.changePage(props.page + 1);
      }
    }
  };

  const onPrev = () => {
    // check value is not undefine, ...
    if (props.changePage && typeof props.page === "number") {
      // check page
      if (props.page > 0) {
        props.changePage(props.page - 1);
      }
    }
  };

  const goDirect = (page: number) => {
    if (props.changePage) {
      props.changePage(page);
    }
  };

  React.useEffect(() => {
    if (
      typeof props.page === "number" &&
      typeof props.entriesPerPage === "number" &&
      typeof props.totalEntries === "number"
    ) {
      const start = props.page * props.entriesPerPage + 1;
      const end = Math.min(
        (props.page + 1) * props.entriesPerPage,
        props.totalEntries
      );
      setEntries({
        start,
        end,
      });
    }
  }, [props.page]);

  return (
    <div className="flex justify-center md:justify-between flex-wrap items-center flex-row-reverse mx-2 ">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            disabled={typeof props.page === "number" ? props.page === 0 : true}
            className="flex items-center px-2.5 py-1 rounded-md border-2 border-blue-light text-blue-light font-bold hover:text-white hover:bg-blue-light hover:shadow-lg transition-colors duration-200 ease-in-out"
            onClick={onPrev}
          >
            Prev
          </button>
        </li>
        <li className="font-bold flex justify-center items-center space-x-2">
          {(props.page as any) + 1 !== 1 && (
            <>
              <span
                className="hover:cursor-pointer"
                onClick={() => goDirect(0)}
              >
                1
              </span>
              <span>...</span>
            </>
          )}
          <span>
            Page {(props.page as any) + 1} of {totalPages}
          </span>
          {(props.page as any) + 1 !== totalPages && (
            <>
              <span>...</span>
              <span
                className="hover:cursor-pointer"
                onClick={() => goDirect(totalPages - 1)}
              >
                {totalPages}
              </span>
            </>
          )}
        </li>
        <li>
          <button
            disabled={
              typeof props.page === "number"
                ? props.page === totalPages - 1
                : false
            }
            className="flex items-center px-2.5 py-1 rounded-md border-2 border-blue-light text-blue-light font-bold hover:text-white hover:bg-blue-light hover:shadow-lg transition-colors "
            onClick={onNext}
          >
            Next
          </button>
        </li>
        {props.changePageSize && (
          <li>
            <Select
              className="w-fit pr-7 border-green-300 border-2 text-xs"
              value={props.entriesPerPage}
              onChange={(e) => {
                props.changePageSize &&
                  props.changePageSize(parseInt(e.target.value));
                props.changePage && props.changePage(0);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </Select>
          </li>
        )}
      </ul>
      <div>
        <span className="text-sm">
          Showing <strong>{entries.start}</strong> to{" "}
          <strong>{entries.end}</strong> of{" "}
          <strong>{props.totalEntries}</strong> entries
        </span>
      </div>
    </div>
  );
}

export default React.memo(Pagination);
