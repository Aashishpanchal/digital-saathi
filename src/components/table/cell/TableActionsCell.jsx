import React from "react";
import { Spinner } from "flowbite-react";
import { RiDeleteBinFill, RiFileEditLine } from "react-icons/ri";
import { FaArrowRight, FaRupeeSign } from "react-icons/fa";
import { CgViewList } from "react-icons/cg";
export default function TableActionsCell(props) {
    const [deleteLoading, setDeleteLoading] = React.useState(false);
    const { cell } = props;
    return (<div className="flex space-x-4 items-center justify-center">
      {props.onWeightPrice && (<FaRupeeSign size={18} onClick={() => props.onWeightPrice && props.onWeightPrice(cell.row.original)} className="hover:text-gray-700 hover:cursor-pointer"/>)}
      {props.onEdit && (<RiFileEditLine size={20} onClick={() => props.onEdit && props.onEdit(cell.row.original)} className="hover:text-gray-700 hover:cursor-pointer"/>)}
      {props.onView && (<CgViewList onClick={() => props.onView && props.onView(cell.row.original)} size={20} className="hover:text-gray-700 hover:cursor-pointer"/>)}
      {props.onDelete &&
            (deleteLoading ? (<Spinner size="md"/>) : (<RiDeleteBinFill onClick={() => props.onDelete &&
                    props.onDelete(cell.row.original, setDeleteLoading)} size={20} className="hover:text-gray-700 hover:cursor-pointer"/>))}
      {props.onNext && (<FaArrowRight onClick={() => props.onNext && props.onNext(cell.row.original)} size={20} className="hover:text-gray-700 hover:cursor-pointer"/>)}
    </div>);
}
