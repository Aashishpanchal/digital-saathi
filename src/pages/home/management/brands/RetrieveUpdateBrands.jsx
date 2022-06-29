import React from "react";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { FormRender } from "../../../../components/form";
import { brands } from "../../../../http";
import { useDispatch } from "react-redux";
import useFormBrands from "./useFormBrands";
import useForms from "../../../../hooks/useForms";
import { setFormAlert } from "../../../../redux/slices/alertSlice";
import { useParams } from "react-router-dom";
export default function RetrieveUpdateBrands() {
    const { getFormsFields } = useFormBrands();
    const dispatch = useDispatch();
    const { data, setData, errors, onValidate } = useForms({
        fields: getFormsFields,
    });
    const params = useParams();
    const onRetrieve = async () => {
        try {
            const res = await brands("get", { params: params.id });
            if (res?.status === 200) {
                const setValues = {};
                getFormsFields.forEach((item) => {
                    setValues[item.name] = res.data[item.name] || item.defaultValue;
                });
                setData(setValues);
            }
        }
        catch (err) {
            console.log(err.response);
        }
    };
    const onUpdate = async () => {
        const isValid = onValidate();
        if (isValid) {
            try {
                const res = await brands("put", {
                    params: params.id,
                    data: JSON.stringify(data),
                });
                if (res?.status === 200) {
                    await onRetrieve();
                    return true;
                }
            }
            catch (err) {
                if (err?.response?.status === 400) {
                    dispatch(setFormAlert({
                        type: "red",
                        highLight: "Server Validation Error! ",
                        text: err?.response?.data?.message,
                        show: true,
                    }));
                }
            }
            return false;
        }
        return isValid;
    };
    React.useEffect(() => {
        onRetrieve();
    }, []);
    return (<AdminContainer>
      <MainContainer heading="Brand Details">
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <FormRender data={data} setData={setData} fields={getFormsFields} errors={errors} onUpdate={onUpdate}/>
        </div>
      </MainContainer>
    </AdminContainer>);
}
