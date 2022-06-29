import React from "react";
export default function Pagination(props) {
    const [entries, setEntries] = React.useState({
        start: 1,
        end: 1,
    });
    const onNext = () => {
        // check value is not undefine, ...
        if (props.changePage &&
            typeof props.page === "number" &&
            props.totalPages) {
            // check page
            if (props.page < props.totalPages) {
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
    React.useEffect(() => {
        if (typeof props.page === "number") {
            if (typeof props.totalPages === "number" &&
                props.entriesPerPage &&
                props.totalEntries) {
                // showing default pages entries
                if (props.page === 0) {
                    setEntries({
                        ...entries,
                        end: props.totalPages === 0
                            ? props.totalEntries
                            : props.entriesPerPage,
                    });
                }
                else {
                    // dynamic entries showing
                    const showStart = props.page * props.entriesPerPage + 1;
                    const showEnd = (props.page + 1) * props.entriesPerPage < props.totalEntries
                        ? (props.page + 1) * props.entriesPerPage
                        : props.totalEntries;
                    setEntries({
                        ...entries,
                        start: showStart,
                        end: showEnd,
                    });
                }
            }
        }
    }, [props.page]);
    return (<div className="flex justify-center md:justify-between flex-wrap items-center flex-row-reverse mx-2 ">
      <ul className="flex items-center space-x-2">
        <li>
          <button disabled={typeof props.page === "number" ? props.page === 0 : true} className="flex items-center px-2.5 py-1 rounded-md border-2 border-blue-light text-blue-light font-bold hover:text-white hover:bg-blue-light hover:shadow-lg transition-colors duration-200 ease-in-out" onClick={onPrev}>
            Prev
          </button>
        </li>
        <li className="font-bold">
          Page {props.page + 1} of {props.totalPages + 1}
        </li>
        <li>
          <button disabled={typeof props.page === "number"
            ? props.page === props.totalPages
            : false} className="flex items-center px-2.5 py-1 rounded-md border-2 border-blue-light text-blue-light font-bold hover:text-white hover:bg-blue-light hover:shadow-lg transition-colors " onClick={onNext}>
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
    </div>);
}
