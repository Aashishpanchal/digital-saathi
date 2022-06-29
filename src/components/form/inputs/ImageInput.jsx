import { Label } from "flowbite-react";
import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { baseImageUrl } from "../../../http/config";
export default function ImageInput(props) {
    const [avatar, setAvatar] = React.useState("");
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
        if (props.file === null) {
            setAvatar(props.file);
        }
        else {
            setAvatar(`${baseImageUrl}${props.imageMiddleUri}/${props.file}`);
        }
    }, [props.file]);
    return (<div className="my-3">
      <Label className="md-2 block" id="image">
        {props.label}
      </Label>
      <FileUploader multiple={true} handleChange={props.handleChange} name="file" types={props.types || ["JPEG", "PNG"]}/>
      <p className="font-bold">
        {props.file
            ? typeof props.file === "string"
                ? `File name: ${props.file}`
                : `File name: ${props.file[0].name}`
            : "no files uploaded yet"}
      </p>
      {avatar && (<div className="rounded-xl overflow-hidden w-1/2 h-1/2 shadow-lg">
          <img className="object-cover" src={avatar} alt="preview"/>
        </div>)}
    </div>);
}
