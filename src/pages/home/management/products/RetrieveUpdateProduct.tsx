import { Label, Select, Textarea } from "flowbite-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import UpdateActions from "../../../../components/common/UpdateActions";
import { Form } from "../../../../components/form";
import { shopProducts } from "../../../../http";
import { FileUploader } from "react-drag-drop-files";
import LabelTextInput from "../../../../components/form/LabelTextInput";

export default function RetrieveUpdateProduct() {
  const [data, setData] = React.useState({
    sku_name: "",
    sku_name_kannada: "0",
    sku_code: "",
    category_id: "",
    sub_category_id: "",
    brand: "",
    hsn_code: "",
    description: "",
    active: 0,
  });

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onRetrieve = async () => {};

  const onUpdate = async () => {};

  const onCancel = () => navigate(-1);

  React.useEffect(() => {
    onRetrieve();
  }, []);

  return (
    <AdminContainer>
      <MainContainer heading="Category Details">
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <LabelTextInput
              type={"text"}
              label="SKU Name"
              name="sku_name"
              value={data.sku_name}
              onChange={onChange}
              hint="SKU Name is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"text"}
              label="SKU Name kannada"
              name="sku_name_kannada"
              value={data.sku_name_kannada}
              onChange={onChange}
              hint="SKU Name Kannada is compulsory"
              hintColor="green"
            />
            <LabelTextInput
              type={"text"}
              label="SKU Code"
              name="sku_code"
              value={data.sku_code}
              onChange={onChange}
              hint="SKU Code is compulsory"
              hintColor="green"
            />
            <div>
              <Label htmlFor="category">Category</Label>
              <Select id="category" required>
                <option value="0">Select</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="sub_category">Sub Category</Label>
              <Select id="sub_category" required>
                <option value="0">Select</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select id="brand" required>
                <option value="0">Select</option>
              </Select>
            </div>
            <LabelTextInput
              type={"text"}
              label="HSN Code"
              name="hsn_code"
              value={data.hsn_code}
              onChange={onChange}
            />
            <div>
              <Label className="md-2 block">Description</Label>
              <Textarea
                value={data.description}
                onChange={(e) => {
                  setData({ ...data, description: e.target.value });
                }}
              />
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
