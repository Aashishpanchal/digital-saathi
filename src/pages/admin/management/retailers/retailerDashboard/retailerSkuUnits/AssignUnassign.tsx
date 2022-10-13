import React from "react";
import { useDispatch } from "react-redux";
import { shopAssignRetailerProducts } from "../../../../../../http/server-api/server-apis";
import {
  closeInformationModal,
  setInformationModal,
} from "../../../../../../redux/slices/modalSlice";

function AssignUnassign(props: {
  cell: { [key: string]: any };
  retailerId?: string;
  onComplete: Function;
}) {
  const { cell, retailerId: retailer_id, onComplete } = props;
  const { original } = cell.row;
  const { shop_productweightprices, sku_id, assign_unassign } = original;

  const dispatch = useDispatch();

  // function sleep(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  const onAssign = async () => {
    let i = 1;
    dispatch(
      setInformationModal({
        show: true,
        showLoading: true,
      })
    );
    for (const iterator of shop_productweightprices) {
      // await sleep(1000);
      try {
        const res = await shopAssignRetailerProducts("post", {
          data: JSON.stringify({
            retailer_id,
            sku_id,
            price_id: iterator?.price_id,
            sale_price: iterator?.price,
          }),
        });
        if (res?.status === 200) {
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
      if (shop_productweightprices.length === i++) {
        dispatch(closeInformationModal());
        await onComplete();
      }
    }
  };

  const onUnassign = async () => {
    let i = 1;
    dispatch(
      setInformationModal({
        show: true,
        showLoading: true,
      })
    );
    for await (const obj of assign_unassign) {
      const { assign_id, product_price_id } = obj;
      try {
        const res = await shopAssignRetailerProducts("delete", {
          postfix: `?assign_id=${assign_id}&product_price_id=${product_price_id}`,
        });
        if (res?.status === 200) {
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
      if (shop_productweightprices.length === i++) {
        dispatch(closeInformationModal());
        await onComplete();
      }
    }
  };

  return (
    <button
      className={`w-fit py-1 px-1.5 rounded-full flex space-x-1 items-center bg-opacity-10 ${
        cell.value === "assign"
          ? "text-green-500 bg-green-500"
          : "text-red-500 bg-red-500"
      }`}
      onClick={cell.value !== "assign" ? onAssign : onUnassign}
    >
      {cell.value}
    </button>
  );
}

export default React.memo(AssignUnassign);
