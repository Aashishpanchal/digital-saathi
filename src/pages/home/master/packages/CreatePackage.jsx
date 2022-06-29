import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import CreateActions from "../../../../components/common/CreateActions";
import MainContainer from "../../../../components/common/MainContainer";
import { Form } from "../../../../components/form";
import LabelTextInput from "../../../../components/form/LabelTextInput";
import { shopPackages } from "../../../../http";
export default function CreatePackage() {
    const [data, setData] = React.useState({
        package: "",
    });
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const onCreated = async () => {
        try {
            setLoading(true);
            const res = await shopPackages("post", {
                data: JSON.stringify(data),
            });
            if (res?.status === 200) {
                onReset();
            }
        }
        catch (err) {
            console.log(err.response);
        }
        setLoading(false);
    };
    const onCancel = () => navigate(-1);
    const onReset = () => {
        setData({
            package: "",
        });
    };
    return (<AdminContainer>
      <MainContainer heading="Packages Details">
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <LabelTextInput type={"text"} label="Package Name" name="package" value={data.package} onChange={onChange} hint="package name is compulsory" hintColor="green"/>
          </div>
          <CreateActions startLoading={loading} onSave={onCreated} onCancel={onCancel} onReset={onReset}/>
        </Form>
      </MainContainer>
    </AdminContainer>);
}
