import { Label, Select } from "flowbite-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import CreateActions from "../../../../components/common/CreateActions";
import MainContainer from "../../../../components/common/MainContainer";
import { Form } from "../../../../components/form";
import { deliveryRetailer, retailer as httpRetailer } from "../../../../http";
export default function DeliveryPartnersRetailer() {
    const [data, setData] = React.useState({
        retailer_id: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [retailer, setRetailers] = React.useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const onRetailers = async () => {
        try {
            const res = await httpRetailer("get");
            if (res?.status === 200) {
                setRetailers(res.data);
            }
        }
        catch (err) {
            console.log(err.response);
        }
    };
    const onSave = async () => {
        if (data.retailer_id) {
            setLoading(true);
            try {
                const res = await deliveryRetailer("post", {
                    data: JSON.stringify({
                        retailer_id: parseInt(data.retailer_id),
                        partner_id: params.id,
                    }),
                });
                if (res?.status === 200) {
                    onReset();
                }
            }
            catch (err) {
                console.log(err.response);
            }
            setLoading(false);
        }
    };
    const onCancel = () => navigate(-1);
    const onReset = () => {
        setData({
            retailer_id: "",
        });
    };
    React.useEffect(() => {
        onRetailers();
    }, []);
    return (<AdminContainer>
      <MainContainer heading="Delivery Partners/Retailer">
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <div>
              <Label htmlFor="select-retailer">Select your country</Label>
              <Select id="select-retailer" required name="retailer_id" value={data.retailer_id} onChange={(e) => {
            setData({ ...data, retailer_id: e.target.value });
        }}>
                <option>Select Retailer</option>
                {retailer.map((item, index) => {
            return (<option key={index} value={item.retailer_id}>
                      {item.retailer_name}
                    </option>);
        })}
              </Select>
            </div>

            <CreateActions startLoading={loading} onSave={onSave} onCancel={onCancel} onReset={onReset}/>
          </div>
        </Form>
      </MainContainer>
    </AdminContainer>);
}
