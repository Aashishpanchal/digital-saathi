import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import CreateActions from "../../../../components/common/CreateActions";
import MainContainer from "../../../../components/common/MainContainer";
import { Form } from "../../../../components/form";
import LabelTextInput from "../../../../components/form/LabelTextInput";
import { deliveryPartners } from "../../../../http";
export default function CreateFarmers() {
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
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const onCreated = async () => {
        try {
            setLoading(true);
            const res = await deliveryPartners("post", {
                data: JSON.stringify({
                    ...data,
                    auth_code: "auth0|62905e7af9d32a006f911bcsa",
                }),
            });
            if (res?.status === 200) {
                onReset();
            }
        }
        catch (e) {
            console.log(e.response);
        }
        setLoading(false);
    };
    const onCancel = () => navigate(-1);
    const onReset = () => {
        // automatically reset the form
        setData({
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
    };
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
          <CreateActions startLoading={loading} onSave={onCreated} onCancel={onCancel} onReset={onReset}/>
        </Form>
      </MainContainer>
    </AdminContainer>);
}
