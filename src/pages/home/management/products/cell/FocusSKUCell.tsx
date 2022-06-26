import { Spinner } from "flowbite-react";
import React from "react";
import { FaStar } from "react-icons/fa";
import { shopProducts } from "../../../../../http";

export default function FocusSKUCell(props: {
  cell: any;
  idKey: string;
  setData?: any;
  onUpdate?: any;
}) {
  const [focusSku, setFocusSku] = React.useState(props.cell.value);
  const [loading, setLoading] = React.useState(false);

  const onUpdate = async () => {
    const focus_sku = focusSku === 1 ? 0 : 1;
    try {
      setLoading(true);
      const res = await shopProducts("put", {
        data: JSON.stringify({ focus_sku }),
        params: props.cell.row.values[props.idKey],
      });
      if (res?.status === 200) {
        setFocusSku(focus_sku);
        props.setData((prev: any) => {
          if (
            typeof prev.currentPage === "number" ||
            typeof prev.currentPage === "string"
          ) {
            try {
              shopProducts("get", {
                postfix: `?page=${prev.currentPage}`,
              })?.then((res: any) => {
                if (res?.status === 200) {
                  props.setData(res.data);
                }
              });
            } catch (err: any) {
              console.log(err.response);
            }
          } else {
            props.onUpdate(setLoading);
          }
          return prev;
        });
      }
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
          focusSku === 1 ? "border-yellow-300 text-yellow-300" : ""
        )}
      >
        {loading && <Spinner size="sm" color="red" />}
        {!loading && <FaStar size={20} />}
      </div>
    </div>
  );
}
