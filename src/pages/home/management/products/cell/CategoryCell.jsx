import { Spinner } from "flowbite-react";
import React from "react";
import { categories } from "../../../../../http";
export default function CategoryCell(props) {
    const { category_id } = props;
    const [data, setData] = React.useState({
        name: "",
    });
    const onRetrieve = async () => {
        try {
            const res = await categories("get", {
                params: category_id.toString(),
            });
            if (res?.status === 200) {
                setData({
                    name: res.data.name,
                });
            }
        }
        catch (e) {
            // console.log(e.response);
            if (e.response?.status === 404) {
                setData({
                    name: "Not found",
                });
            }
        }
    };
    React.useEffect(() => {
        onRetrieve();
    }, []);
    return data.name ? (<div>{data.name}</div>) : (<div className="font-bold flex items-center space-x-2">
      <Spinner size="md"/>
      <span>Loading...</span>
    </div>);
}
