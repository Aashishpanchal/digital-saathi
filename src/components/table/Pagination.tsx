import React from "react";

export default function Pagination(props: {
  page?: number;
  changePage?: (page: number) => void;
  totalPages?: number;
  totalEntries?: number;
  entriesPerPage?: number;
}) {
  const [entries, setEntries] = React.useState({
    start: 1,
    end: 1,
  });

  const onNext = () => {
    if (props.changePage && props.page) {
      props.changePage(props.page + 1);
    }
  };

  const onPrev = () => {
    if (props.changePage && props.page) {
      if (props.page > 1) {
        props.changePage(props.page - 1);
      }
    }
  };

  React.useEffect(() => {
    if (props.page) {
      // if (props.totalPages && props.entriesPerPage && props.totalEntries) {
      //   const check = props.totalEntries - entries.end;
      //   if (props.entriesPerPage < props.totalEntries) {
      //   const start = (props.page - 1) * props.entriesPerPage + 1;
      //   const end = start + props.entriesPerPage - 1;
      //   setEntries({
      //     start,
      //     end,
      //   });
      // }
    }
  }, [props.page]);
  // 0 = new, 1, 2 = Accepted, 3 - in-process, 4 - out of delivery,, 5 - delivered, 6 - returned, 7 - cancelled, 8 - returning
  return (
    <div className="flex justify-between flex-wrap items-center flex-row-reverse mx-2">
      <ul className="flex items-center space-x-1">
        <li>
          <button
            disabled={props.page ? props.page === 1 : true}
            className="flex items-center px-2.5 py-1 rounded-md border-2 border-blue-light text-blue-light font-bold hover:text-white hover:bg-blue-light hover:shadow-lg transition-colors duration-200 ease-in-out"
            onClick={onPrev}
          >
            Prev
          </button>
        </li>
        <li>
          <button
            className="flex items-center px-2.5 py-1 rounded-md border-2 border-blue-light text-blue-light font-bold hover:text-white hover:bg-blue-light hover:shadow-lg transition-colors "
            onClick={onNext}
          >
            Next
          </button>
        </li>
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
