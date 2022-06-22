import { Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import UpdateActions from "../../../../components/common/UpdateActions";
import { Form } from "../../../../components/form";
import { farmers } from "../../../../http";

export default function RetrieveUpdate() {
  const [data, setData] = React.useState({
    customer_name: "",
    auth_code: "",
    active: 0,
  });

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const { farmer_id } = params;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onRetrieve = async () => {
    try {
      const res = await farmers("get", {
        params: farmer_id,
      });
      if (res?.status === 200) {
        setData({
          customer_name: res?.data?.customer_name,
          auth_code: res?.data?.auth_code,
          active: res?.data?.active,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onUpdate = async () => {
    try {
      setLoading(true);
      const res = await farmers("put", {
        data: JSON.stringify(data),
        params: farmer_id,
      });
      if (res?.status === 200) {
        await onRetrieve();
      }
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
            <div className="my-4">
              <Label htmlFor="customer-name" className="md-2 block">
                Customer Name
              </Label>
              <TextInput
                id="customer-name"
                type={"text"}
                name="customer_name"
                value={data.customer_name}
                onChange={onChange}
              />
            </div>
            <div className="my-4 flex items-center gap-2">
              <Checkbox
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
