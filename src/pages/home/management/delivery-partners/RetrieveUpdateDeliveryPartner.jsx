import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { Form } from "../../../../components/form";
import { deliveryPartners } from "../../../../http";
import LabelTextInput from "../../../../components/form/LabelTextInput";
import UpdateActions from "../../../../components/common/UpdateActions";
export default function RetrieveUpdateCategories() {
    const [data, setData] = React.useState({
        partner_name: "",
        zone_name: "",
        erp_code: "",
        phone_no: "",
        email_id: "",
        address: "",
        state: "",
        district: "",
        city: "",
        pincode: 0,
        subzone_id: "",
    });
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const onRetrieve = async () => {
        try {
            const res = await deliveryPartners("get", {
                params: params.id,
            });
            if (res?.status === 200) {
                let filterValue = {};
                for (const key in res.data) {
                    const value = res?.data[key];
                    if (value !== null && value !== undefined) {
                        filterValue = {
                            ...data,
                            ...filterValue,
                            [key]: value,
                        };
                    }
                }
                setData(filterValue);
            }
        }
        catch (e) {
            console.log(e.response);
        }
    };
    const onUpdate = async () => {
        try {
            setLoading(true);
            await deliveryPartners("put", {
                data: JSON.stringify(data),
                params: params.id,
            });
            await onRetrieve();
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    };
    const onCancel = () => navigate(-1);
    React.useEffect(() => {
        onRetrieve();
    }, []);
    return (<AdminContainer>
      <MainContainer heading="Delivery Partner Details">
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <LabelTextInput type={"text"} label="Partner Name" name="partner_name" value={data.partner_name} onChange={onChange} hint="partner name is compulsory" hintColor="green"/>
            <LabelTextInput type={"text"} label="Zone Name" name="zone_name" value={data.zone_name} onChange={onChange}/>
            <LabelTextInput type={"text"} label="ERP Code" name="erp_code" value={data.erp_code} onChange={onChange}/>
            <LabelTextInput type={"text"} label="Phone No" name="phone_no" value={data.phone_no} onChange={onChange}/>
            <LabelTextInput type={"text"} label="Email Id" name="email_id" value={data.email_id} onChange={onChange} hint="email id is compulsory" hintColor="green"/>
            <LabelTextInput type={"text"} label="Address" name="address" value={data.address} onChange={onChange}/>
            <LabelTextInput type={"text"} label="State" name="state" value={data.state} onChange={onChange}/>
            <LabelTextInput type={"text"} label="District" name="district" value={data.district} onChange={onChange}/>
            <LabelTextInput type={"text"} label="City" name="city" value={data.city} onChange={onChange}/>
            <LabelTextInput type={"number"} label="Pincode" name="pincode" value={data.pincode} onChange={onChange}/>
            <LabelTextInput type={"text"} label="Subzone Id" name="subzone_id" value={data.subzone_id} onChange={onChange}/>
          </div>
          <UpdateActions startLoading={loading} onSave={onUpdate} onCancel={onCancel}/>
        </Form>
      </MainContainer>
    </AdminContainer>);
}
