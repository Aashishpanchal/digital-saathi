import { Label, Select, Textarea } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import CreateActions from "../../../../components/common/CreateActions";
import MainContainer from "../../../../components/common/MainContainer";
import { Form } from "../../../../components/form";
import LabelTextInput from "../../../../components/form/LabelTextInput";
import { categories } from "../../../../http";
import { FileUploader } from "react-drag-drop-files";

export default function CreateFarmers() {
  const [data, setData] = React.useState({
    name: "",
    parent_category_id: "0",
    description: "",
  });

  const [selectCategory, setSelectCategory] = React.useState([]);

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

  const onRetrieveCategory = async () => {
    try {
      const res = await categories("get", { postfix: `?page=${0}` });
      if (res?.status === 200) {
        setSelectCategory(res.data.categories);
      }
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const onCreated = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (file) {
        formData.append("image", file[0]);
      }
      for (const key in data) {
        formData.append(key, (data as any)[key]);
      }
      const res = await categories("post", {
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
      description: "",
      parent_category_id: "0",
      name: "",
    });
    setFile(null);
    setAvatar("");
  };

  React.useEffect(() => {
    onRetrieveCategory();
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
              <Label htmlFor="countries">Parent Category</Label>
              <Select
                id="countries"
                required
                name="country"
                value={data.parent_category_id}
                onChange={(e) => {
                  setData({ ...data, parent_category_id: e.target.value });
                }}
              >
                <option value="0">None</option>
                {selectCategory.map((item: any, index) => (
                  <option key={index.toString()} value={item.category_id}>
                    {item.name}
                  </option>
                ))}
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
