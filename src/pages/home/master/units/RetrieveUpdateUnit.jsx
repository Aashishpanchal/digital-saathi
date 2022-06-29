import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import UpdateActions from "../../../../components/common/UpdateActions";
import { Form } from "../../../../components/form";
import { shopUnits } from "../../../../http";
import LabelTextInput from "../../../../components/form/LabelTextInput";
export default function RetrieveUpdateUnit() {
    const [data, setData] = React.useState({
        units: "",
    });
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const { id: units_id } = params;
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const onRetrieve = async () => {
        try {
            const res = await shopUnits("get", {
                params: units_id,
            });
            if (res?.status === 200) {
                setData({
                    units: res?.data?.units,
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
            await shopUnits("put", {
                data: JSON.stringify(data),
                params: units_id,
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
      <MainContainer heading="Unit Details">
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <LabelTextInput type={"text"} label="Unit Name" name="units" value={data.units} onChange={onChange} hint="Units name is compulsory" hintColor="green"/>
          </div>
          <UpdateActions startLoading={loading} onSave={onUpdate} onCancel={onCancel}/>
        </Form>
      </MainContainer>
    </AdminContainer>);
}
