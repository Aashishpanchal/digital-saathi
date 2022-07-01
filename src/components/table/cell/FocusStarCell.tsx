import { Spinner } from "flowbite-react";
import React from "react";
import { FaStar } from "react-icons/fa";

export default function FocusStarCell(props: {
  cell: any;
  idKey: string;
  postfix: string;
  setData: any;
  axiosFunction?: any;
  payload?: Array<string>;
}) {
  const { cell, axiosFunction, idKey, setData, payload, postfix } = props;
  const { original } = cell.row;
  const [loading, setLoading] = React.useState(false);

  const getPayload = () => {
    let result: any = {};
    if (payload) {
      payload.map((name) => {
        result[name] = original[name];
      });
    }
    return result;
  };

  const onUpdate = async () => {
    if (typeof axiosFunction === "function" && idKey) {
      const focus_sku = cell.value === 1 ? 0 : 1;
      const id = original[idKey];
      setLoading(true);
      // server request
      try {
        const res = await axiosFunction("put", {
          data: JSON.stringify({ ...getPayload(), focus_sku }),
          params: id,
        });
        if (res?.status === 200) {
          try {
            const res = await axiosFunction("get", {
              postfix: postfix,
            });
            if (res?.status === 200) {
              setData(res.data);
            }
          } catch (err: any) {
            console.log(err.response);
          }
        }
      } catch (error: any) {
        console.log(error.response);
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        disabled={props.axiosFunction ? false : true}
        onClick={onUpdate}
        className={"hover:cursor-pointer w-fit border-2 px-1 py-1 rounded-lg bg-white shadow-sm ".concat(
          cell.value === 1 ? "border-yellow-300 text-yellow-300" : ""
        )}
      >
        {loading && <Spinner size="sm" color="red" />}
        {!loading && <FaStar size={20} />}
      </button>
    </div>
  );
}
