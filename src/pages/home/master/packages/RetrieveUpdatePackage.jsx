import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import UpdateActions from "../../../../components/common/UpdateActions";
import { Form } from "../../../../components/form";
import { shopPackages } from "../../../../http";
import LabelTextInput from "../../../../components/form/LabelTextInput";
export default function RetrieveUpdatePackage() {
    const [data, setData] = React.useState({
        package: "",
    });
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const { id: package_id } = params;
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const onRetrieve = async () => {
        try {
            const res = await shopPackages("get", {
                params: package_id,
            });
            if (res?.status === 200) {
                setData({
                    package: res?.data?.package,
                });
            }
        }
        catch (e) {
            console.log(e.response);
        }
    };
    const onUpdate = async () => {
        try {
            setLoading(true);
            await shopPackages("put", {
                data: JSON.stringify(data),
                params: package_id,
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
      <MainContainer heading="Packages Details">
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <LabelTextInput type={"text"} label="Package Name" name="package" value={data.package} onChange={onChange} hint="package name is compulsory" hintColor="green"/>
          </div>
          <UpdateActions startLoading={loading} onSave={onUpdate} onCancel={onCancel}/>
        </Form>
      </MainContainer>
    </AdminContainer>);
}
