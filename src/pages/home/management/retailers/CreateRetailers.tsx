import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import CreateActions from "../../../../components/common/CreateActions";
import MainContainer from "../../../../components/common/MainContainer";
import { Form } from "../../../../components/form";
import LabelTextInput from "../../../../components/form/LabelTextInput";
// import useValidation from "../../../../hooks/useValidation";
import { retailer } from "../../../../http";

export default function CreateRetailers() {
  const [data, setData] = React.useState({
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
  });
  // const { isValid, validFields, checkValidate } = useValidation([
  //   "retailer_name",
  //   "email",
  //   "pincode",
  // ]);

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onCreated = async () => {
    try {
      setLoading(true);
      const res = await retailer("post", {
        data: JSON.stringify(data),
      });
      if (res?.status === 200) {
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onCancel = () => navigate(-1);

  return (
    <AdminContainer>
      <MainContainer heading="Retailer Details">
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <LabelTextInput
              label="Retailer Name"
              type={"text"}
              name="retailer_name"
              value={data.retailer_name}
              onChange={onChange}
              hint="Retailer Name is required"
              hintColor={"green"}
            />
            <LabelTextInput
              label="Email"
              type={"email"}
              name="email"
              value={data.email}
              onChange={onChange}
              hint="Email is required"
              hintColor={"green"}
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
              hintColor={"green"}
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
          </div>
          <CreateActions
            startLoading={loading}
            onSave={onCreated}
            onCancel={onCancel}
            onReset={() => {}}
          />
        </Form>
      </MainContainer>
    </AdminContainer>
  );
}
