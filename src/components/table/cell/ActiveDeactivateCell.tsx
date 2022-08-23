import { Spinner } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTableAlert } from "../../../redux/slices/alertSlice";
import { RootState } from "../../../redux/store";

export default function ActivateDeactivateCell(props: {
  cell: any;
  idKey?: string;
  axiosFunction?: any;
  setData?: any;
  onUpdate?: any;
  postfix?: string;
  payload?: Array<string>;
}) {
  const [isActive, setIsActive] = React.useState(props.cell.value);
  const { original } = props.cell.row;
  const [loading, setLoading] = React.useState(false);
  const { tableAlert } = useSelector((state: RootState) => state.alertSlice);
  const dispatch = useDispatch();

  const getPayload = () => {
    let result: any = {};
    if (props.payload) {
      props.payload.map((name) => {
        result[name] = original[name];
      });
    }
    return result;
  };

  const onActive = async () => {
    if (typeof props.axiosFunction === "function" && props.idKey) {
      const active = isActive === 1 ? 0 : 1;
      const id = props.cell.row.values[props.idKey];
      try {
        setLoading(true);
        const res = await props.axiosFunction("put", {
          params: id,
          data: JSON.stringify({ ...getPayload(), active }),
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
                          text: `S./No ${id} is ${
                            active === 1 ? "Activate" : "Deactivate"
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
                      text: `S./No ${id} is ${
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
        console.log(err);
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
