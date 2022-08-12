import React from "react";
import { useDispatch } from "react-redux";
import {
  closeInformationModal,
  setInformationModal,
} from "../redux/slices/modalSlice";

export default function useGetData(props: {
  axiosFunction: any;
  extractKey: string;
  postfix?: string;
}) {
  const [data, setData] = React.useState([]);
  const [otherInfo, setOtherInfo] = React.useState({});
  const [hack, setHack] = React.useState(true);

  const dispatch = useDispatch();

  const [localPage, setLocalPage] = React.useState(0);

  const onRetrieves = async () => {
    try {
      const res = await props.axiosFunction("get", {
        postfix: `?page=${localPage}${
          props.postfix ? "&" + props.postfix : ""
        }`,
      });
      if (res?.status === 200) {
        const { totalItems, totalPages, currentPage, ...others } = res.data;
        setOtherInfo({ totalItems, totalPages });
        if (totalPages === currentPage) {
          dispatch(closeInformationModal());
          return;
        }
        if (totalPages !== currentPage) {
          if (others[props.extractKey] instanceof Array) {
            setData(data.concat(others[props.extractKey]));
            setLocalPage(localPage + 1);
          }
        }
      }
    } catch (error: any) {
      dispatch(
        setInformationModal({
          show: true,
          runClose: true,
          heading: "Error/Server Side Error",
          title: "Extract Data UnComplete",
          message: error.response || error,
        })
      );
      return;
    }
  };

  React.useEffect(() => {
    onRetrieves();
    if (hack) {
      dispatch(
        setInformationModal({
          show: true,
          showLoading: true,
        })
      );
      setHack(false);
    }
  }, [localPage]);

  return { data, otherInfo };
}
