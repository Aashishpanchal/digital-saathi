import React from "react";
import { Spinner } from "flowbite-react";
import { RiDeleteBinFill, RiFileEditLine } from "react-icons/ri";
import {
  FaArrowRight,
  FaCartPlus,
  FaImage,
  FaMapMarkedAlt,
  FaRupeeSign,
  FaWarehouse,
} from "react-icons/fa";
import { CgViewList } from "react-icons/cg";
import { MdSpaceDashboard } from "react-icons/md";

type onClickType = (value: { [key: string]: any }) => void;

export default function TableActionsCell(props: {
  cell: any;
  onDelete?: (
    value: { [key: string]: any },
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  onEdit?: onClickType;
  onNext?: onClickType;
  onView?: onClickType;
  onWeightPrice?: onClickType;
  onImage?: onClickType;
  onDashBoard?: onClickType;
  onWarehouse?: onClickType;
  onOrder?: onClickType;
  onArea?: onClickType;
}) {
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const { cell } = props;
  return (
    <div className="flex space-x-4 items-center justify-center">
      {props.onWeightPrice && (
        <FaRupeeSign
          size={18}
          onClick={() =>
            props.onWeightPrice && props.onWeightPrice(cell.row.original)
          }
          className="hover:text-gray-700 hover:cursor-pointer"
        />
      )}
      {props.onImage && (
        <FaImage
          size={24}
          onClick={() => props.onImage && props.onImage(cell.row.original)}
          className="hover:text-gray-700 hover:cursor-pointer"
        />
      )}

      {props.onDashBoard && (
        <MdSpaceDashboard
          size={20}
          onClick={() =>
            props.onDashBoard && props.onDashBoard(cell.row.original)
          }
          className="hover:text-gray-700 hover:cursor-pointer"
        />
      )}
      {props.onOrder && (
        <FaCartPlus
          size={20}
          onClick={() => props.onOrder && props.onOrder(cell.row.original)}
          className="hover:text-gray-700 hover:cursor-pointer"
        />
      )}
      {props.onArea && (
        <FaMapMarkedAlt
          size={20}
          onClick={() => props.onArea && props.onArea(cell.row.original)}
          className="hover:text-gray-700 hover:cursor-pointer"
        />
      )}
      {props.onWarehouse && (
        <FaWarehouse
          size={20}
          onClick={() =>
            props.onWarehouse && props.onWarehouse(cell.row.original)
          }
          className="hover:text-gray-700 hover:cursor-pointer"
        />
      )}
      {props.onEdit && (
        <RiFileEditLine
          size={20}
          onClick={() => props.onEdit && props.onEdit(cell.row.original)}
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
              props.onDelete(cell.row.original, setDeleteLoading)
            }
            size={20}
            className="hover:text-gray-700 hover:cursor-pointer"
          />
        ))}
      {props.onView && (
        <CgViewList
          onClick={() => props.onView && props.onView(cell.row.original)}
          size={24}
          className="hover:text-gray-700 hover:cursor-pointer"
        />
      )}
      {props.onNext && (
        <FaArrowRight
          onClick={() => props.onNext && props.onNext(cell.row.original)}
          size={20}
          className="hover:text-gray-700 hover:cursor-pointer"
        />
      )}
    </div>
  );
}
