import React from "react";
import { Spinner } from "flowbite-react";
import { RiDeleteBinFill, RiFileEditLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { CgViewList } from "react-icons/cg";

export default function TableActionsCell(props: {
  cell: any;
  onDelete?: (
    value: { [key: string]: any },
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  onEdit?: (value: { [key: string]: any }) => void;
  onNext?: (value: { [key: string]: any }) => void;
  onView?: (value: { [key: string]: any }) => void;
}) {
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const { cell } = props;
  return (
    <div className="flex space-x-4 items-center justify-center">
      {props.onEdit && (
        <RiFileEditLine
          size={20}
          onClick={() => props.onEdit && props.onEdit(cell.row.values)}
          className="hover:text-gray-700 hover:cursor-pointer"
        />
      )}
      {props.onView && (
        <CgViewList
          onClick={() => props.onView && props.onView(cell.row.values)}
          size={20}
          className="hover:text-gray-700 hover:cursor-pointer"
        />
      )}
      {props.onDelete &&
        (deleteLoading ? (
          <Spinner size="md" />
        ) : (
          <RiDeleteBinFill
            onClick={() =>
              props.onDelete &&
              props.onDelete(cell.row.values, setDeleteLoading)
            }
            size={20}
            className="hover:text-gray-700 hover:cursor-pointer"
          />
        ))}
      {props.onNext && (
        <FaArrowRight
          onClick={() => props.onNext && props.onNext(cell.row.values)}
          size={20}
          className="hover:text-gray-700 hover:cursor-pointer"
        />
      )}
    </div>
  );
}
