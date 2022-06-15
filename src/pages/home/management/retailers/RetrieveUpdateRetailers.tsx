import { Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import UpdateActions from "../../../../components/common/UpdateActions";
import { Form } from "../../../../components/form";
import LabelTextInput from "../../../../components/form/LabelTextInput";
import { retailer } from "../../../../http";

export default function RetrieveUpdateRetailers() {
  const [data, setData] = React.useState({
    auth_code: "",
    retailer_name: "",
    email: "",
    phone_number: "",
    zone_name: "",
    erp_code: "",
    address: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    jurisdiction: "",
    terms_conditions: "",
    pan_no: "",
    default_credit_limit: "",
    default_credit_period: "",
    distributor_level: "",
    subzone_id: "",
    active: 0,
  });

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onRetrieve = async () => {
    try {
      const res = await retailer("get", {
        params: params.id,
      });
      if (res?.status === 200) {
        setData(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onUpdate = async () => {
    try {
      setLoading(true);
      const res = await retailer("put", {
        data: JSON.stringify(data),
        params: params.id,
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onCancel = () => navigate(-1);

  React.useEffect(() => {
    onRetrieve();
  }, []);

  return (
    <AdminContainer>
      <MainContainer heading="Edit User">
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <div className="my-4">
              <ul className="flex space-x-2 items-center">
                <li className="text-sm font-bold">Auth Code: </li>
                <li className="font-bold">{data.auth_code}</li>
              </ul>
            </div>
            <LabelTextInput
              label="Retailer Name"
              type={"text"}
              name="retailer_name"
              value={data.retailer_name}
              onChange={onChange}
              hint="Retailer Name is required"
              hintColor="green"
            />
            <LabelTextInput
              label="Email"
              type={"email"}
              name="email"
              value={data.email}
              onChange={onChange}
              hint="Email is required"
              hintColor="green"
            />
            <LabelTextInput
              label="Phone Number"
              type={"text"}
              name="phone_number"
              value={data.phone_number}
              onChange={onChange}
            />
            <LabelTextInput
              label="Zone Name"
              type={"text"}
              name="zone_name"
              value={data.zone_name}
              onChange={onChange}
            />
            <LabelTextInput
              label="ERP Code"
              type={"text"}
              name="erp_code"
              value={data.erp_code}
              onChange={onChange}
            />
            <LabelTextInput
              label="Address"
              type={"text"}
              name="address"
              value={data.address}
              onChange={onChange}
            />
            <LabelTextInput
              label="State"
              type={"text"}
              name="state"
              value={data.state}
              onChange={onChange}
            />
            <LabelTextInput
              label="District"
              type={"text"}
              name="district"
              value={data.district}
              onChange={onChange}
            />
            <LabelTextInput
              label="City"
              type={"text"}
              name="city"
              value={data.city}
              onChange={onChange}
            />
            <LabelTextInput
              label="Pincode"
              type={"text"}
              name="pincode"
              value={data.pincode}
              onChange={onChange}
              hint="Pincode is required"
              hintColor="green"
            />
            <LabelTextInput
              label="Jurisdiction"
              type={"text"}
              name="jurisdiction"
              value={data.jurisdiction}
              onChange={onChange}
            />
            <LabelTextInput
              label="Terms & Conditions"
              type={"text"}
              name="terms_conditions"
              value={data.terms_conditions}
              onChange={onChange}
            />
            <LabelTextInput
              label="PAN No"
              type={"text"}
              name="pan_no"
              value={data.pan_no}
              onChange={onChange}
            />
            <LabelTextInput
              label="Default Credit Limit"
              type={"text"}
              name="default_credit_limit"
              value={data.default_credit_limit}
              onChange={onChange}
            />
            <LabelTextInput
              label="Default Credit Period"
              type={"text"}
              name="default_credit_period"
              value={data.default_credit_period}
              onChange={onChange}
            />
            <LabelTextInput
              label="Distributor Level"
              type={"text"}
              name="distributor_level"
              value={data.distributor_level}
              onChange={onChange}
            />
            <LabelTextInput
              label="Subzone Id"
              type={"text"}
              name="subzone_id"
              value={data.subzone_id}
              onChange={onChange}
            />
            <div className="my-4 flex items-center gap-2">
              <Checkbox
                className="hover:cursor-pointer"
                name="active"
                checked={Boolean(data.active)}
                onChange={(e) => {
                  setData({ ...data, active: Number(e.target.checked) });
                }}
              />
              <Label htmlFor="active" className="md-2 block font-bold">
                Active
              </Label>
            </div>
          </div>
          <UpdateActions
            startLoading={loading}
            onSave={onUpdate}
            onCancel={onCancel}
          />
        </Form>
      </MainContainer>
    </AdminContainer>
  );
}
