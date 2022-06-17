import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function PageNumber(props: {
  start: number;
  end: number;
  current: number;
  size: number;
  onClick?: (num: number) => void;
}) {
  const { start, end, current, size, onClick } = props;
  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
    if (i === size) {
      break;
    }
  }
  return (
    <>
      {pageNumbers.map((num, index) => {
        return (
          <li
            key={index}
            className={"hover:cursor-pointer border dark:border-gray-700 list-none rounded ".concat(
              num === current
                ? "bg-blue-light text-white"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            )}
          >
            <button
              onClick={() => onClick && onClick(num)}
              className="px-2 py-0.5"
              disabled={num === current}
            >
              {num.toString()}
            </button>
          </li>
        );
      })}
    </>
  );
}

export default function Pagination(props: {
  horizontalSlotLength?: number;
  size: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onChangePageSet?: (pageSet: number) => void;
  showPageSet?: boolean;
}) {
  const [startPageNumber, setStartPageNumber] = React.useState(1);
  const [endPageNumber, setEndPageNumber] = React.useState(1);
  const [stopNext, setStopNext] = React.useState(1);

  const pageSlot = [10, 20, 30, 100];
  const [pageSet, setPageSet] = React.useState(pageSlot[0]);

  const horizontalSlotLength = props.horizontalSlotLength || 3;
  const onPageChange = props.onPageChange;
  const currentPageNumber = props.currentPage;

  const onNextPage = () => {
    if (currentPageNumber < endPageNumber && currentPageNumber < props.size) {
      onPageChange(currentPageNumber + 1);
    } else if (
      currentPageNumber === endPageNumber &&
      endPageNumber < stopNext
    ) {
      setStartPageNumber(startPageNumber + horizontalSlotLength);
      setEndPageNumber(endPageNumber + horizontalSlotLength);
      onPageChange(currentPageNumber + 1);
    }
  };
  const onPreviousPage = () => {
    if (currentPageNumber > startPageNumber) {
      onPageChange(currentPageNumber - 1);
    } else if (currentPageNumber === startPageNumber && startPageNumber > 1) {
      setStartPageNumber(startPageNumber - horizontalSlotLength);
      setEndPageNumber(endPageNumber - horizontalSlotLength);
      onPageChange(currentPageNumber - 1);
    }
  };

  const onClickPage = (page: number) => {
    onPageChange(page);
  };

  const setRange = (size: number, entries: number) => {
    setStartPageNumber(1);
    let endNumber = 1;
    if (size % entries === 0) {
      endNumber = size / entries;
    } else {
      endNumber = Math.floor(size / entries) + 1;
    }
    // get end page with horizontal slot length
    setStopNext(endNumber);
    onPageChange(1);
    setEndPageNumber(endNumber);
  };

  React.useEffect(() => {
    setRange(props.size, pageSet);
  }, [props.size, pageSet]);

  return (
    <div className="flex items-center justify-end mt-2">
      <ul className="flex items-center justify-between space-x-2 text-sm">
        {/* Left Icon */}
        <li className="hover:cursor-pointer list-none rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <button
            onClick={onPreviousPage}
            disabled={currentPageNumber === 1}
            className="flex py-0.5 px-0.5 overflow-hidden active:bg-gray-50 dark:active:bg-gray-600"
          >
            <MdKeyboardArrowLeft size={20} />
          </button>
        </li>
        {/* Page Number */}
        <PageNumber
          start={startPageNumber}
          end={endPageNumber}
          current={currentPageNumber}
          size={props.size}
          onClick={onClickPage}
        />
        {/* Right Icon */}
        <li className="hover:cursor-pointer list-none rounded border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <button
            onClick={onNextPage}
            disabled={currentPageNumber === props.size}
            className="flex py-0.5 px-0.5 active:bg-gray-50 dark:active:bg-gray-600"
          >
            <MdKeyboardArrowRight size={20} />
          </button>
        </li>
      </ul>
      {props.showPageSet && (
        <select
          className="ml-2 cursor-pointer text-sm w-28 inline-block px-4 py-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          style={{
            height: "32px",
          }}
          onChange={(e) => {
            const pageSet = parseInt(e.target.value);
            props.onChangePageSet && props.onChangePageSet(pageSet);
            setPageSet(pageSet);
          }}
        >
          {pageSlot.map((slot, index) => {
            return (
              <option key={index} value={slot}>
                {slot} / entries
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
}
