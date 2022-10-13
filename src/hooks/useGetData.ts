import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  closeInformationModal,
  setInformationModal,
} from "../redux/slices/modalSlice";

type Data = { [key: string]: any };

export default function useGetData() {
  const dispatch = useDispatch();

  const asyncRequest = useCallback(async function* (
    axiosFunction: any,
    extractKey: string,
    postfix?: string
  ) {
    let localPage = 0;
    while (true) {
      try {
        const res = await axiosFunction("get", {
          postfix: `?page=${localPage}${postfix ? "&" + postfix : ""}`,
        });
        if (res?.status === 200) {
          const { totalItems, totalPages, currentPage, ...others } = res.data;
          if (others[extractKey] instanceof Array) {
            yield others[extractKey];
            localPage += 1;
          }
          if (totalPages === currentPage + 1) {
            break;
          }
          if (totalPages === 0 && currentPage === 0) {
            break;
          }
        }
      } catch (error: any) {
        console.log(error.response);
        break;
      }
    }
  },
  []);

  const getAllData = React.useCallback(
    async (
      axiosFunction: any,
      extractKey: string,
      filterValue: (value: Data) => Data,
      postfix?: string,
      callback?: (value: Array<Data>) => void
    ) => {
      dispatch(
        setInformationModal({
          show: true,
          showLoading: true,
        })
      );
      let data: any = {};
      for await (const values of asyncRequest(
        axiosFunction,
        extractKey,
        postfix
      )) {
        if (values instanceof Array) {
          values.forEach((items) => {
            const { key, value } = filterValue(items);
            data[key] = value;
          });
          if (typeof callback === "function") {
            callback(data);
          }
        }
      }
      dispatch(closeInformationModal());
      return data;
    },
    [asyncRequest]
  );

  return { asyncRequest, getAllData };
}
