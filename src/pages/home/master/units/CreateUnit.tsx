import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import CreateActions from "../../../../components/common/CreateActions";
import MainContainer from "../../../../components/common/MainContainer";
import { Form } from "../../../../components/form";
import LabelTextInput from "../../../../components/form/LabelTextInput";
import { shopUnits } from "../../../../http";

export default function CreateUnit() {
  const [data, setData] = React.useState({
    units: "",
  });

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onCreated = async () => {
    try {
      setLoading(true);
      const res = await shopUnits("post", {
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
      units: "",
    });
  };

  return (
    <AdminContainer>
      <MainContainer heading="Units Details">
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <LabelTextInput
              type={"text"}
              label="Units Name"
              name="units"
              value={data.units}
              onChange={onChange}
              hint="Units name is compulsory"
              hintColor="green"
            />
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
