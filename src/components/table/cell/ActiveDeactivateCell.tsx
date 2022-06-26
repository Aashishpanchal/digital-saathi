import { Spinner } from "flowbite-react";
import React from "react";

export default function ActivateDeactivateCell(props: {
  cell: any;
  idKey?: string;
  onClick?: (
    value: { [key: string]: any },
    setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  axiosFunction?: any;
  setData?: any;
  onUpdate?: any;
}) {
  const [isActive, setIsActive] = React.useState(props.cell.value);
  const [loading, setLoading] = React.useState(false);

  const onActive = async () => {
    if (typeof props.axiosFunction === "function" && props.idKey) {
      const active = isActive === 1 ? 0 : 1;
      const id = props.cell.row.values[props.idKey];
      try {
        setLoading(true);
        const res = await props.axiosFunction("put", {
          params: id,
          data: JSON.stringify({ active }),
        });
        if (res?.status === 200) {
          setIsActive(active);
          props.setData((prev: any) => {
            if (
              typeof prev.currentPage === "number" ||
              typeof prev.currentPage === "string"
            ) {
              try {
                props
                  .axiosFunction("get", {
                    postfix: `?page=${prev.currentPage}`,
                  })
                  .then((res: any) => {
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
      } catch (err: any) {
        console.log(err.response);
      }
      setLoading(false);
    }
  };

  return (
    <button
      disabled={props.axiosFunction ? false : true}
      onClick={() => onActive()}
      className={"w-fit py-1 px-1.5 rounded-full flex space-x-1 items-center bg-opacity-10 ".concat(
        isActive === 1
          ? "text-green-500 bg-green-500"
          : "text-yellow-500 bg-yellow-500"
      )}
    >
      {loading && <Spinner size="sm" color="red" />}
      <span>{isActive === 1 ? "Activate" : "Deactivate"}</span>
    </button>
  );
}
