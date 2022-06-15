import { Label, TextInput } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import CreateActions from "../../../../components/common/CreateActions";
import MainContainer from "../../../../components/common/MainContainer";
import { Form } from "../../../../components/form";
import { farmers } from "../../../../http";

export default function CreateFarmers() {
  const [data, setData] = React.useState({
    customer_name: "",
    auth_code: "",
  });

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onCreated = async () => {
    try {
      setLoading(true);
      const res = await farmers("post", {
        data: JSON.stringify(data),
      });
      setData({
        customer_name: "",
        auth_code: "",
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onCancel = () => navigate(-1);
  const onReset = () => setData({ customer_name: "", auth_code: "" });

  return (
    <AdminContainer>
      <MainContainer heading="Invite User(s)">
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <div className="my-4">
              <Label htmlFor="auth-code" className="md-2 block">
                Auth Code
              </Label>
              <TextInput
                name="auth_code"
                value={data.auth_code}
                onChange={onChange}
                type={"text"}
                id="auth-code"
              />
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
