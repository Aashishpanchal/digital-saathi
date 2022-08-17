import { useDispatch } from "react-redux";
import useForms, { FieldsType } from "../../../hooks/forms/useForms";
import useBucket from "../../../hooks/useBucket";
import { setFormAlert } from "../../../redux/slices/alertSlice";
import FormRender from "../FormRender";

type Data = { [key: string]: any };

interface ImageOption {
  key: string;
  subDirName: string;
}

interface PropsInterface {
  axiosFunction: any;
  fields: Array<FieldsType>;
  extraPostData?: Data;
  saveBeforeCallBack?: (data: Data) => Data;
  imageOption?: ImageOption;
  setDefaultValue?: { [key: string]: any };
}

export default function CreateAutoForm(props: PropsInterface) {
  // some Hooks
  const { S3ImageUploader } = useBucket(props.imageOption?.subDirName);
  const dispatch = useDispatch();

  // post method
  const PostRequest = async (data: Data) => {
    return props.axiosFunction("post", {
      data: JSON.stringify(data),
    });
  };

  const { data, setData, onClear, errors, onValidate } = useForms({
    fields: props.fields,
    setDefaultValue: props.setDefaultValue,
  });

  // save not stay method
  const onSave = async () => {
    let saveData = data;
    if (onValidate()) {
      if (typeof props.saveBeforeCallBack === "function") {
        saveData = props.saveBeforeCallBack(data);
      }
      try {
        // step first check we want save image in S3 Bucket
        if (typeof props.imageOption !== "undefined") {
          const { [props.imageOption.key]: image, ...newData } = saveData;
          const metadata: any = await S3ImageUploader(image);
          if (metadata) {
            // upload data in server
            const res = await PostRequest({
              [props.imageOption.key]: metadata.Location,
              ...newData,
              ...(props.extraPostData ? props.extraPostData : {}),
            });
            // uploading finish return true
            if (res?.status === 200) {
              return true;
            }
          }
        }
        // upload simple data in server
        const res = await PostRequest({
          ...saveData,
          ...(props.extraPostData ? props.extraPostData : {}),
        });
        // uploading finish return true
        if (res?.status === 200) {
          return true;
        }
      } catch (err: any) {
        // show errors
        if (err?.response?.status === 400) {
          dispatch(
            setFormAlert({
              type: "red",
              highLight: "Server Validation Error! ",
              text: err?.response?.data?.message,
              show: true,
            })
          );
          return false;
        }
        dispatch(
          setFormAlert({
            type: "red",
            highLight: "Frontend Error! ",
            text: String(err),
            show: true,
          })
        );
      }
    }
    return false;
  };

  // save on stay method
  const onSaveStay = async () => {
    const res = await onSave();
    if (res) {
      dispatch(
        setFormAlert({
          type: "green",
          highLight: "Success! ",
          text: "Data Add Successfully..",
          show: true,
        })
      );
    }
  };

  // Return JSX React
  return (
    <FormRender
      data={data}
      setData={setData}
      onReset={onClear}
      fields={props.fields}
      errors={errors}
      onSave={onSave}
      onSaveStay={onSaveStay}
    />
  );
}
