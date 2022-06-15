import { Label, Textarea } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import CreateActions from "../../../../components/common/CreateActions";
import MainContainer from "../../../../components/common/MainContainer";
import { Form } from "../../../../components/form";
import LabelTextInput from "../../../../components/form/LabelTextInput";
import { brands } from "../../../../http";
import { FileUploader } from "react-drag-drop-files";

export default function CreateBrands() {
  const [data, setData] = React.useState({
    brand_name: "",
    description: "",
  });
  const [avatar, setAvatar] = React.useState("");

  const fileTypes = ["JPEG", "PNG"];

  const [file, setFile] = React.useState<any>(null);

  const handleChange = (file: any) => {
    setFile(file);
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file[0]);
    }
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatar(reader.result);
      }
    };
  };

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onCreated = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      let key: keyof typeof data;
      for (key in data) {
        formData.append(key, data[key]);
      }
      const res = await brands("post", {
        data: formData,
      });
      if (res?.status === 200) {
        onReset();
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onCancel = () => navigate(-1);
  const onReset = () => {
    setData({
      brand_name: "",
      description: "",
    });
    setFile(null);
    setAvatar("");
  };

  return (
    <AdminContainer>
      <MainContainer heading="Brand Details">
        <Form>
          <div className="w-full md:w-[28rem] lg:w-[28rem]">
            <LabelTextInput
              type={"text"}
              label="Brand Name"
              name="brand_name"
              value={data.brand_name}
              onChange={onChange}
              hint="brand name is compulsory"
              hintColor="green"
            />
            <div className="my-3">
              <Label className="md-2 block">
                Drag & Drop Files But Image size should be square (500) x (500).
              </Label>
              <FileUploader
                multiple={true}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
              <p className="font-bold">
                {file ? `File name: ${file[0].name}` : "no files uploaded yet"}
              </p>
              {avatar && (
                <div className="rounded-xl overflow-hidden w-1/2 h-1/2 shadow-lg">
                  <img className="object-cover" src={avatar} alt="preview" />
                </div>
              )}
            </div>
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
