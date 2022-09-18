import { memo } from "react";
import { Spinner } from "flowbite-react";
import { FaExclamationTriangle } from "react-icons/fa";
import Table, { TableProps } from "./Table";

interface ReactTableProps extends TableProps {
  loading?: boolean;
  showMessage?: boolean;
  message?: string;
  axiosFunction?: Function;
}

function ReactTable(props: ReactTableProps) {
  const { loading, showMessage, message, ...tableProps } = props;

  return loading ? (
    <div className="flex flex-col justify-center items-center space-y-3 mt-4">
      <Spinner color="green" size="xl" className="object-cover w-24 h-24" />
      <h2 className="dark:text-gray-100">
        Please wait fetch data from server....
      </h2>
    </div>
  ) : !showMessage ? (
    <Table {...tableProps} />
  ) : (
    <div className="flex flex-col justify-center items-center">
      <FaExclamationTriangle size={50} className="text-gray-500" />
      <span className="font-bold">{message ?? "Sorry, No records found."}</span>
    </div>
  );
}

export default memo(ReactTable);
