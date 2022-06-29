import { Label, Select, Textarea, TextInput } from "flowbite-react";
import React from "react";
export default function LabelTextInput(props) {
    const random = Math.random().toString(36).substring(7);
    const id = `${props.name}-${props.type}-${random}`;
    if (props.type === "textarea") {
        return (<div className="my-1">
        <Label className="md-2 block" id={id}>
          {props.label}
        </Label>
        <Textarea className="border-2" name={props.name} value={props.value} onChange={props.onChange} id={id} helperText={props.hint} required={props.required} maxLength={props.maxLength} placeholder={props.placeholder} color={props.hintColor}/>
      </div>);
    }
    if (props.type === "select") {
        return (<div className="my-1">
        <Label htmlFor={id}>{props.label}</Label>
        <Select className="border-2" id={id} required name={props.name} value={props.value} onChange={props.onChange} helperText={props.hint} color={props.hintColor}>
          {props.options &&
                Object.keys(props.options).map((name, index) => (<option key={index.toString()} value={name}>
                {props?.options[name]}
              </option>))}
        </Select>
      </div>);
    }
    return (<div className="my-1">
      <Label htmlFor={id} className="md-2 block">
        {props.label}
      </Label>
      <TextInput className="border-2" id={id} type={props.type} name={props.name} value={props.value} onChange={props.onChange} helperText={props.hint} required={props.required} maxLength={props.maxLength} placeholder={props.placeholder} color={props.hintColor}/>
    </div>);
}
