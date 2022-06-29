import { Spinner } from "flowbite-react";
import React from "react";
import { retailer } from "../../../http";
export default function RetailerNameCell(props) {
    const { retailer_id } = props;
    const [data, setData] = React.useState({
        retailer_name: "",
    });
    const onRetrieve = async () => {
        try {
            const res = await retailer("get", {
                params: retailer_id.toString(),
            });
            if (res?.status === 200) {
                setData({
                    retailer_name: res.data.retailer_name,
                });
            }
        }
        catch (e) {
            if (e.response?.status === 404) {
                setData({
                    retailer_name: "Not found",
                });
            }
        }
    };
    React.useEffect(() => {
        onRetrieve();
    }, []);
    return data.retailer_name ? (<div>{data.retailer_name}</div>) : (<div className="font-bold flex items-center space-x-2">
      <Spinner size="md"/>
      <span>Loading...</span>
    </div>);
}
