import { Spinner } from "flowbite-react";
import React from "react";
import { farmers } from "../../../http";

export default function FarmerNameCell(props: { customer_id: number }) {
  const { customer_id } = props;

  const [data, setData] = React.useState({
    customer_name: "",
  });

  const onRetrieve = async () => {
    try {
      const res = await farmers("get", {
        params: customer_id.toString(),
      });
      if (res?.status === 200) {
        setData({
          customer_name: res.data.customer_name,
        });
      }
    } catch (e: any) {
      if (e.response?.status === 404) {
        setData({
          customer_name: "Not found",
        });
      }
    }
  };

  React.useEffect(() => {
    onRetrieve();
  }, []);

  return data.customer_name ? (
    <div>{data.customer_name}</div>
  ) : (
    <div className="font-bold flex items-center space-x-2">
      <Spinner size="md" />
      <span>Loading...</span>
    </div>
  );
}
