import React from "react";
import { useDispatch } from "react-redux";
import useForms, { FieldsType } from "../../../hooks/forms/useForms";
import useBucket from "../../../hooks/useBucket";
import { setFormAlert } from "../../../redux/slices/alertSlice";
import {
  closeInformationModal,
  setInformationModal,
} from "../../../redux/slices/modalSlice";
import FormRender from "../FormRender";

type Data = { [key: string]: any };

interface ImageOption {
  key: string;
  subDirName: string;
}

interface PropsInterface {
  fields: Array<FieldsType>;
  axiosFunction: Function;
  params: any;
  extraPostData?: Data;
  updateBeforeCallBack?: (data: Data) => Data;
  retrieveBeforeCallBack?: (filterData: Data, originalData?: Data) => Data;
  imageOption?: ImageOption;
  setDefaultValue?: { [key: string]: any };
}

function RetrieveUpdateAutoForm(props: PropsInterface) {
  // some Hooks
  const [previousImage, setPreviousImage] = React.useState<string>("");
  const { S3UpdateImage } = useBucket(props.imageOption?.subDirName);
  const { data, setData, onClear, errors, onValidate } = useForms({
    fields: props.fields,
    setDefaultValue: props.setDefaultValue,
  });
  const dispatch = useDispatch();

  // Put Method
  const PutRequest = async (data: Data) => {
    return props.axiosFunction("put", {
      params: props.params,
      data: JSON.stringify(data),
    });
  };

  //   Get Method
  const GetRequest = async () => {
    return props.axiosFunction("get", {
      params: props.params,
    });
  };

  //   Retrieve Method
  const onRetrieve = async () => {
    dispatch(
      setInformationModal({
        show: true,
        showLoading: true,
      })
    );
    try {
      const res = await GetRequest();
      if (res?.status === 200) {
        let localValues: any = {};
        props.fields.forEach((item) => {
          localValues[item.name] = `${
            res.data[item.name] || item.defaultValue
          }`;
        });
        if (typeof props.retrieveBeforeCallBack === "function") {
          localValues = props.retrieveBeforeCallBack(localValues, res.data);
        }
        if (typeof props.imageOption !== "undefined") {
          setPreviousImage(res.data[props.imageOption.key]);
        }
        setData(localValues);
      }
    } catch (err: any) {
      dispatch(
        setInformationModal({
          show: true,
          runClose: true,
          heading: "Error/Server Side Error",
          title: "Extract Data UnComplete",
          message: err.response || err,
        })
      );
    }
    dispatch(closeInformationModal());
  };

  // update method
  const onUpdate = async () => {
    let saveData = data;
    if (onValidate()) {
      if (typeof props.updateBeforeCallBack === "function") {
        saveData = props.updateBeforeCallBack(data);
      }
      try {
        // step first check we want save image in S3 Bucket
        if (typeof props.imageOption !== "undefined") {
          const { [props.imageOption.key]: image, ...newData } = saveData;
          const metadata: any = await S3UpdateImage(previousImage, image);
          if (metadata) {
            // upload data in server
            const res = await PutRequest({
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
        const res = await PutRequest({
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

  React.useEffect(() => {
    onRetrieve();
  }, []);

  // Return JSX React
  return (
    <FormRender
      data={data}
      setData={setData}
      onReset={onClear}
      fields={props.fields}
      errors={errors}
      onUpdate={onUpdate}
    />
  );
}

export default React.memo(RetrieveUpdateAutoForm);
