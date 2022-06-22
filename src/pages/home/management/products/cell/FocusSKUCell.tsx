import { Spinner } from "flowbite-react";
import React from "react";
import { FaStar } from "react-icons/fa";
import { shopProducts } from "../../../../../http";

export default function FocusSKUCell(props: { cell: any }) {
  const { focus_sku, sku_id } = props.cell.row.values;
  const [data, setData] = React.useState({
    focus_sku: focus_sku,
  });
  const [loading, setLoading] = React.useState(false);

  const onRetrieve = async () => {
    setLoading(true);
    try {
      const res = await shopProducts("get", {
        params: sku_id,
      });
      if (res?.status === 200) {
        setData({
          focus_sku: res.data.focus_sku,
        });
      }
    } catch (e: any) {
      console.log(e.response);
    }
    setLoading(false);
  };

  const onUpdate = async () => {
    try {
      setLoading(true);
      await shopProducts("put", {
        data: JSON.stringify({
          focus_sku: focus_sku === 1 ? 0 : 1,
        }),
        params: sku_id,
      });
      await onRetrieve();
    } catch (e: any) {
      console.log(e.response);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div
        onClick={onUpdate}
        className={"hover:cursor-pointer w-fit border-2 px-1 py-1 rounded-lg bg-white shadow-sm ".concat(
          data.focus_sku === 1 ? "border-yellow-300 text-yellow-300" : ""
        )}
      >
        {loading && <Spinner size="sm" color="red" />}
        {!loading && <FaStar size={20} />}
      </div>
    </div>
  );
}
