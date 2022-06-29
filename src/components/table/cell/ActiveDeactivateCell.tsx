import { Spinner } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTableAlert } from "../../../redux/slices/alertSlice";
import { RootState } from "../../../redux/store";

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
  postfix?: string;
}) {
  const [isActive, setIsActive] = React.useState(props.cell.value);
  const [loading, setLoading] = React.useState(false);
  const { tableAlert } = useSelector((state: RootState) => state.alertSlice);
  const dispatch = useDispatch();

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
                    postfix: `?page=${prev.currentPage}${props.postfix || ""}`,
                  })
                  .then((res: any) => {
                    if (res?.status === 200) {
                      dispatch(
                        setTableAlert({
                          ...tableAlert,
                          show: true,
                          highLight: "Success ",
                          text: `s/no. ${id} is ${
                            isActive === 1 ? "Activate" : "Deactivate"
                          } successfully applied.`,
                          type: "green",
                        })
                      );
                      props.setData(res.data);
                    }
                  });
              } catch (err: any) {
                if (err?.response?.status === 400) {
                  dispatch(
                    setTableAlert({
                      ...tableAlert,
                      show: true,
                      highLight: "Server Error! ",
                      text: `s/no. ${id} is ${
                        isActive === 1 ? "Activate" : "Deactivate"
                      } not applied. ${err?.response?.data?.message}`,
                      type: "red",
                    })
                  );
                }
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
