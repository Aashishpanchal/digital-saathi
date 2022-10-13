import { Avatar, Label } from "flowbite-react";
import React from "react";
import { FileUploader } from "react-drag-drop-files";

export default function ImageInput(props: {
  handleChange?: (file: File) => void;
  types?: Array<string>;
  file?: any;
  label?: string;
  hintText?: string;
  onChangeWithBase64?: (file: string) => void;
}) {
  const [avatar, setAvatar] = React.useState("");

  const getFileName = React.useCallback(() => {
    if (typeof props.file === "string") {
      try {
        return props.file.length >= 50
          ? props.file.slice(0, 50) + "....."
          : props.file;
      } catch (error) {
        return "No Name of Image";
      }
    } else if (props.file instanceof File) {
      return props.file.name;
    }
    return "no files uploaded yet";
  }, [props.file]);

  const captureImage = (file: File) => {
    if (props.onChangeWithBase64) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          if (props.onChangeWithBase64) {
            props.onChangeWithBase64(reader.result);
          }
        }
      };
    }
  };

  React.useEffect(() => {
    if (props.file instanceof File) {
      const reader = new FileReader();
      if (props.file) {
        reader.readAsDataURL(props.file);
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setAvatar(reader.result);
          }
        };
      }
    }
    if (typeof props.file === "string") {
      setAvatar(props.file);
    }
  }, [props.file]);

  return (
    <div className="my-3">
      <Label className="md-2 block" id="image">
        {props.label}
      </Label>
      <FileUploader
        multiple={false}
        handleChange={(file: File) => {
          if (props.handleChange) {
            props.handleChange(file);
          }
          captureImage(file);
        }}
        name="file"
        types={props.types || ["JPEG", "PNG"]}
      />
      {props.hintText && (
        <p className="text-red-500 text-sm my-2">{props.hintText}</p>
      )}
      <p className="text-sm">
        <strong>File: </strong>
        <small className="font-bold">{getFileName()}</small>
      </p>
      {avatar && <Avatar img={avatar} bordered size="xl" />}
    </div>
  );
}
