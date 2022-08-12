import { Label } from "flowbite-react";
import React from "react";
import { FileUploader } from "react-drag-drop-files";

export default function ImageInput(props: {
  handleChange?: any;
  types?: Array<string>;
  file?: any;
  label?: string;
}) {
  const [avatar, setAvatar] = React.useState("");

  const getFileName = (file: string | FileList) => {
    if (typeof file === "string") {
      const url = new URL(file);
      return decodeURI(url.pathname.slice(1));
    } else if (file instanceof FileList) {
      return file[0].name;
    }
    return "no files uploaded yet";
  };

  React.useEffect(() => {
    if (typeof props.file !== "string") {
      const reader = new FileReader();
      if (props.file) {
        reader.readAsDataURL(props.file[0]);
      }
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatar(reader.result);
        }
      };
    }
    setAvatar(props.file);
  }, [props.file]);

  return (
    <div className="my-3">
      <Label className="md-2 block" id="image">
        {props.label}
      </Label>
      <FileUploader
        multiple={true}
        handleChange={props.handleChange}
        name="file"
        types={props.types || ["JPEG", "PNG"]}
      />
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
