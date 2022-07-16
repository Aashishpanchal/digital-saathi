import React from "react";

export default function useGetData(props: {
  axiosFunction: any;
  extractKey: string;
  postfix?: string;
}) {
  const [data, setData] = React.useState([]);
  const [otherInfo, setOtherInfo] = React.useState({});

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
      console.log(error.response);
      return;
    }
  };

  React.useEffect(() => {
    onRetrieves();
  }, [localPage]);

  return { data, otherInfo };
}
