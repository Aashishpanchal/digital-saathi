import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import UpdateActions from "../../../../components/common/UpdateActions";
import { Form } from "../../../../components/form";
import { shopAreas } from "../../../../http";
import LabelTextInput from "../../../../components/form/LabelTextInput";
import { Checkbox, Label } from "flowbite-react";

export default function RetrieveUpdateArea() {
  const [data, setData] = React.useState({
    area: "",
    city: "",
    state: "",
    country: "",
    pincode: undefined,
    active: 1,
  });

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const { id: area_id } = params;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onRetrieve = async () => {
    try {
      const res = await shopAreas("get", {
        params: area_id,
      });
      if (res?.status === 200) {
        setData({
          ...res.data,
        });
      }
    } catch (e: any) {
      console.log(e.response);
    }
  };

  const onUpdate = async () => {
    try {
      setLoading(true);
      await shopAreas("put", {
        data: JSON.stringify(data),
        params: area_id,
      });
      await onRetrieve();
    } catch (e: any) {
      console.log(e.response);
    }
    setLoading(false);
  };

  const onCancel = () => navigate(-1);

  React.useEffect(() => {
    onRetrieve();
  }, []);

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
              name="area"
              value={data.city}
              onChange={onChange}
              hint="City Name is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"text"}
              label="State"
              name="area"
              value={data.state}
              onChange={onChange}
              hint="State Name is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"text"}
              label="Country"
              name="area"
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
