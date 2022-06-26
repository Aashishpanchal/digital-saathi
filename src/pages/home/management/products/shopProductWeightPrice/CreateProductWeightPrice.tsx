import { Select } from "flowbite-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import CreateActions from "../../../../../components/common/CreateActions";
import MainContainer from "../../../../../components/common/MainContainer";
import { Form } from "../../../../../components/form";
import LabelTextInput from "../../../../../components/form/LabelTextInput";
import { shopProductWeightPrice } from "../../../../../http";

export default function CreateProductWeightPrice() {
  const { sku_name, sku_id } = useParams();
  const [data, setData] = React.useState({
    sku_id: sku_id,
    mrp: "",
    cgst: "",
    sgst: "",
    igst: "",
    price: "",
    weight: "",
    package: "",
    units_per_case: "",
    focus_sku: "",
    dimension: "",
    totalweight: "",
    units: "",
  });

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const selection = ["ml", "kg", "litre", "gm"];

  const removePostFix = (value: string): any => {
    const reg = /([\d]+(?:\.[\d]+)?(?![\d]))|([a-z.]+)(?![a-z.])/gi;
    return value.match(reg) || ["", ""];
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onCancel = () => navigate(-1);

  const onSave = async () => {
    let { units, ...saveData } = data;
    saveData.weight += units;
    try {
      setLoading(true);
      const res = await shopProductWeightPrice("post", {
        data: JSON.stringify(saveData),
      });
      if (res?.status === 200) {
        onReset()
      }
    } catch (e: any) {
      console.log(e.response);
    }
    setLoading(false);
  };

  const onReset = () => {
    setData({
      sku_id: "",
      mrp: "",
      cgst: "",
      sgst: "",
      igst: "",
      price: "",
      weight: "",
      package: "",
      units_per_case: "",
      focus_sku: "",
      dimension: "",
      totalweight: "",
      units: "",
    });
  };

  return (
    <AdminContainer>
      <MainContainer heading={`${sku_name} / Price Details`}>
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <LabelTextInput
              type={"text"}
              label="MRP"
              name="mrp"
              value={data.mrp || ""}
              onChange={onChange}
              hint="MRP is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"text"}
              label="IGST"
              name="igst"
              value={data.igst || ""}
              onChange={onChange}
              hint="IGST is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"text"}
              label="CGST"
              name="cgst"
              value={data.cgst || ""}
              onChange={onChange}
              hint="CGST is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"text"}
              label="SGST"
              name="sgst"
              value={data.sgst || ""}
              onChange={onChange}
              hint="SGST is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"text"}
              label="Price"
              name="price"
              value={data.price || ""}
              onChange={onChange}
              hint="Price is compulsory"
              hintColor="green"
            />
            <div className="flex items-center justify-between">
              <LabelTextInput
                type={"text"}
                label="Weight"
                name="weight"
                value={removePostFix(data.weight || "")[0]}
                onChange={onChange}
              />
              <div className="mt-5 w-1/2">
                <Select
                  id="units"
                  required
                  name="units"
                  value={data.units}
                  onChange={(e) => {
                    setData({ ...data, units: e.target.value });
                  }}
                >
                  <option>--Select Units--</option>
                  {selection.map((item, index) => (
                    <option key={index.toString()} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <LabelTextInput
              type={"text"}
              label="Package"
              name="package"
              value={data.package || ""}
              onChange={onChange}
              hint="Package is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"text"}
              label="Dimension"
              name="dimension"
              value={data.dimension || ""}
              onChange={onChange}
            />
            <LabelTextInput
              type={"text"}
              label="Total Weight"
              name="totalweight"
              value={data.totalweight || ""}
              onChange={onChange}
            />
            <LabelTextInput
              type={"text"}
              label="Units Per Case"
              name="units_per_case"
              value={data.units_per_case || ""}
              onChange={onChange}
            />
          </div>
          <CreateActions
            startLoading={loading}
            onReset={onReset}
            onSave={onSave}
            onCancel={onCancel}
          />
        </Form>
      </MainContainer>
    </AdminContainer>
  );
}
