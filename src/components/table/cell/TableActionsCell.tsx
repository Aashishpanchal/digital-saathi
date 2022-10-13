import React from "react";
import { Spinner, Tooltip } from "flowbite-react";
import { RiDeleteBinFill, RiFileEditLine } from "react-icons/ri";
import {
  FaArrowRight,
  FaChevronCircleDown,
  FaChevronCircleRight,
  FaImage,
  FaMapMarkedAlt,
  FaPrint,
  FaRupeeSign,
  FaUserAlt,
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
  onUser?: onClickType;
  onPrint?: onClickType;
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
    user?: string;
    print?: string;
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
      {props.onUser && (
        <SquareContainer
          hoverMessage={props.hoverMessage?.user || "User"}
          onClick={() => props.onUser && props.onUser(cell.row.original)}
        >
          <FaUserAlt size={18} />
        </SquareContainer>
      )}
      {props.onPrint && (
        <SquareContainer
          hoverMessage={props.hoverMessage?.print || "Print Now"}
          onClick={() => props.onPrint && props.onPrint(cell.row.original)}
        >
          <FaPrint size={18} />
        </SquareContainer>
      )}
    </div>
  );
}

export const ActionCellButton = (props: {
  children: string;
  show: boolean;
  onShow: (state: boolean) => void;
}) => (
  <Button
    onClick={() => props.onShow(!props.show)}
    color="dark"
    icon={
      props.show ? (
        <FaChevronCircleDown size={18} />
      ) : (
        <FaChevronCircleRight size={18} />
      )
    }
  >
    {props.children}
  </Button>
);

export const PrintActionCell = (props: {
  onPrint?: () => void;
  printUrl?: string;
  show: boolean;
  onShow: (state: boolean) => void;
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
      <ActionCellButton onShow={props.onShow} show={props.show}>
        Action
      </ActionCellButton>
    </div>
  );
};
