import { Label, Select, Textarea } from "flowbite-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import UpdateActions from "../../../../components/common/UpdateActions";
import { Form } from "../../../../components/form";
import { categories } from "../../../../http";
import { FileUploader } from "react-drag-drop-files";
import LabelTextInput from "../../../../components/form/LabelTextInput";
import { baseImageUrl } from "../../../../http/config";

export default function RetrieveUpdateCategories() {
  const [data, setData] = React.useState({
    name: "",
    country: "0",
    description: "",
  });

  const [avatar, setAvatar] = React.useState("");

  const fileTypes = ["JPEG", "PNG"];

  const [file, setFile] = React.useState<any>(null);

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const params = useParams();

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onRetrieve = async () => {
    try {
      const res = await categories("get", {
        params: params.id,
      });
      if (res?.status === 200) {
        setData({
          name: res.data.name,
          country: res.data.country,
          description: res.data.description,
        });
        setAvatar(`${baseImageUrl}category-images/${res.data.image}`);
      }
    } catch (e: any) {
      console.log(e.response);
    }
  };

  const onUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      let key: keyof typeof data;
      for (key in data) {
        formData.append(key, data[key]);
      }
      await categories("put", {
        data: formData,
        params: params.id,
      });
      await onRetrieve();
    } catch (e: any) {
      console.log(e.response);
    }
    setLoading(false);
  };

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
              label="Category Name"
              name="name"
              value={data.name}
              onChange={onChange}
              hint="category name is compulsory"
              hintColor="green"
            />
            <div>
              <Label htmlFor="countries">Select your country</Label>
              <Select
                id="countries"
                required
                name="country"
                value={data.country}
                onChange={(e) => {
                  setData({ ...data, country: e.target.value });
                }}
              >
                <option value="0">None</option>
                <option value="1">Fertilizer</option>
                <option value="2">Chemical</option>
                <option value="3">Seed</option>
                <option value="4">Plant Promoter</option>
              </Select>
            </div>
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
