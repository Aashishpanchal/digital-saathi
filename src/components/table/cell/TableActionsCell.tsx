import React from "react";
import { Spinner, Tooltip } from "flowbite-react";
import { RiDeleteBinFill, RiFileEditLine } from "react-icons/ri";
import {
  FaArrowRight,
  FaCartPlus,
  FaChevronCircleDown,
  FaImage,
  FaMapMarkedAlt,
  FaPrint,
  FaRupeeSign,
  FaWarehouse,
} from "react-icons/fa";
import { CgViewList } from "react-icons/cg";
import { MdSpaceDashboard } from "react-icons/md";
import Button from "../../button/Button";

type onClickType = (value: { [key: string]: any }) => void;

function SquareContainer(props: {
  children: React.ReactNode;
  hoverMessage?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={props.onClick}
      className="border-2 p-1 rounded-lg text-blue-light border-blue-light  hover:cursor-pointer hover:bg-blue-light hover:text-white transition-colors"
    >
      <Tooltip content={props.hoverMessage} trigger="hover">
        {props.children}
      </Tooltip>
    </div>
  );
}

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
  onArea?: onClickType;
  hoverMessage?: {
    edit?: string;
    delete?: string;
    arrow?: string;
    rupee?: string;
    image?: string;
    detail?: string;
    wareHouse?: string;
    dashboard?: string;
    area?: string;
  };
}) {
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const { cell } = props;
  return (
    <div className="flex space-x-4 items-center justify-center">
      {props.onWeightPrice && (
        <SquareContainer
          hoverMessage={props.hoverMessage?.rupee || "Weights and Price"}
          onClick={() =>
            props.onWeightPrice && props.onWeightPrice(cell.row.original)
          }
        >
          <FaRupeeSign size={18} />
        </SquareContainer>
      )}
      {props.onImage && (
        <SquareContainer
          hoverMessage={props.hoverMessage?.image || "More Image"}
          onClick={() => props.onImage && props.onImage(cell.row.original)}
        >
          <FaImage size={18} />
        </SquareContainer>
      )}

      {props.onDashBoard && (
        <SquareContainer
          hoverMessage={props.hoverMessage?.dashboard || "Retailer-Dashboard"}
          onClick={() =>
            props.onDashBoard && props.onDashBoard(cell.row.original)
          }
        >
          <MdSpaceDashboard size={18} />
        </SquareContainer>
      )}
      {props.onArea && (
        <SquareContainer
          hoverMessage={props.hoverMessage?.area || "Area"}
          onClick={() => props.onArea && props.onArea(cell.row.original)}
        >
          <FaMapMarkedAlt size={18} />
        </SquareContainer>
      )}
      {props.onWarehouse && (
        <SquareContainer
          hoverMessage={props.hoverMessage?.wareHouse || "Ware-House"}
          onClick={() =>
            props.onWarehouse && props.onWarehouse(cell.row.original)
          }
        >
          <FaWarehouse size={18} />
        </SquareContainer>
      )}
      {props.onEdit && (
        <SquareContainer
          hoverMessage={props.hoverMessage?.edit || "Edit"}
          onClick={() => props.onEdit && props.onEdit(cell.row.original)}
        >
          <RiFileEditLine size={18} />
        </SquareContainer>
      )}
      {props.onDelete &&
        (deleteLoading ? (
          <Spinner size="md" color="green" />
        ) : (
          <SquareContainer
            hoverMessage={props.hoverMessage?.delete || "Delete"}
            onClick={() =>
              props.onDelete &&
              props.onDelete(cell.row.original, setDeleteLoading)
            }
          >
            <RiDeleteBinFill size={18} />
          </SquareContainer>
        ))}
      {props.onView && (
        <SquareContainer
          hoverMessage={props.hoverMessage?.detail || "Details"}
          onClick={() => props.onView && props.onView(cell.row.original)}
        >
          <CgViewList size={18} />
        </SquareContainer>
      )}
      {props.onNext && (
        <SquareContainer
          hoverMessage={props.hoverMessage?.arrow || "Next"}
          onClick={() => props.onNext && props.onNext(cell.row.original)}
        >
          <FaArrowRight size={18} />
        </SquareContainer>
      )}
    </div>
  );
}

export const PrintActionCell = (props: {
  onPrint?: () => void;
  printUrl?: string;
  onShow?: () => void;
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        onClick={props.onPrint}
        icon={<FaPrint size={18} />}
        color="white"
        url={props.printUrl}
        // target="_blank"
      >
        Print
      </Button>
      <Button
        onClick={props.onShow}
        color="dark"
        icon={<FaChevronCircleDown size={18} />}
      >
        Action
      </Button>
    </div>
  );
};
