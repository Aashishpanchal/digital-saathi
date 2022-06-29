import { Label, Textarea, TextInput } from "flowbite-react";
import React from "react";

export default function LabelTextInput(props: {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  hintColor?: "green" | "red" | "base";
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
}) {
  const random = Math.random().toString(36).substring(7);
  const id = `${props.name}-${props.type}-${random}`;
  if (props.type === "textarea") {
    return (
      <div className="my-1">
        <Label className="md-2 block" id={id}>
          {props.label}
        </Label>
        <Textarea
          className="border-2"
          name={props.name}
          value={props.value}
          onChange={props.onChange as any}
          id={id}
          helperText={props.hint}
          required={props.required}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          color={props.hintColor}
        />
      </div>
    );
  }
  return (
    <div className="my-1">
      <Label htmlFor={id} className="md-2 block">
        {props.label}
      </Label>
      <TextInput
        className="border-2"
        id={id}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        helperText={props.hint}
        required={props.required}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        color={props.hintColor}
      />
    </div>
  );
}
