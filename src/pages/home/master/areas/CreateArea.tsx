import { Checkbox, Label } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import CreateActions from "../../../../components/common/CreateActions";
import MainContainer from "../../../../components/common/MainContainer";
import { Form } from "../../../../components/form";
import LabelTextInput from "../../../../components/form/LabelTextInput";
import { shopAreas } from "../../../../http";

export default function CreateArea() {
  const [data, setData] = React.useState({
    area: "",
    city: "",
    state: "",
    country: "",
    pincode: 0,
    active: 0,
  });

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onCreated = async () => {
    try {
      setLoading(true);
      const res = await shopAreas("post", {
        data: JSON.stringify(data),
      });
      if (res?.status === 200) {
        onReset();
      }
    } catch (err: any) {
      console.log(err.response);
    }
    setLoading(false);
  };

  const onCancel = () => navigate(-1);
  const onReset = () => {
    setData({
      area: "",
      city: "",
      state: "",
      country: "",
      pincode: 0,
      active: 0,
    });
  };

  return (
    <AdminContainer>
      <MainContainer heading="Area Details">
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <LabelTextInput
              type={"text"}
              label="Area"
              name="area"
              value={data.area}
              onChange={onChange}
              hint="Area is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"text"}
              label="City"
              name="city"
              value={data.city}
              onChange={onChange}
              hint="City Name is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"text"}
              label="State"
              name="state"
              value={data.state}
              onChange={onChange}
              hint="State Name is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"text"}
              label="Country"
              name="country"
              value={data.country}
              onChange={onChange}
              hint="Country Name is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"number"}
              label="Pincode"
              name="pincode"
              value={data.pincode}
              onChange={onChange}
            />
            <div className="flex space-x-2 items-center">
              <Checkbox
                id="active-id"
                checked={data.active === 1}
                onChange={(e) => {
                  setData({ ...data, active: e.target.checked ? 1 : 0 });
                }}
              />
              <Label htmlFor="active-id">Active</Label>
            </div>
          </div>
          <CreateActions
            startLoading={loading}
            onSave={onCreated}
            onCancel={onCancel}
            onReset={onReset}
          />
        </Form>
      </MainContainer>
    </AdminContainer>
  );
}
