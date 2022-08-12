import { Label } from "flowbite-react";
import React from "react";
import { FileUploader } from "react-drag-drop-files";

export default function ImageInput(props: {
  handleChange?: any;
  types?: Array<string>;
  file?: any;
  label?: string;
  hintText?: string;
}) {
  const [avatar, setAvatar] = React.useState("");

  const getFileName = (file: string | File) => {
    if (typeof file === "string") {
      const url = new URL(file);
      return decodeURI(url.pathname.slice(1));
    } else if (file instanceof File) {
      return file.name;
    }
    return "no files uploaded yet";
  };

  React.useEffect(() => {
    if (typeof props.file !== "string") {
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
    setAvatar(props.file);
  }, [props.file]);

  return (
    <div className="my-3">
      <Label className="md-2 block" id="image">
        {props.label}
      </Label>
      <FileUploader
        multiple={false}
        handleChange={props.handleChange}
        name="file"
        types={props.types || ["JPEG", "PNG"]}
      />
      {props.hintText && (
        <p className="text-red-500 text-sm my-2">{props.hintText}</p>
      )}
      <p className="text-sm">
        <strong>File: </strong>
        <small className="font-bold">{getFileName(props.file)}</small>
      </p>
      {avatar && (
        <div className="rounded-xl overflow-hidden w-1/2 h-1/2 shadow-lg">
          <img className="object-cover" src={avatar} alt="preview" />
        </div>
      )}
    </div>
  );
}
