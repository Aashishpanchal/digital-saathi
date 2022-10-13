import React from "react";
import ImageInput from "../../../components/form/inputs/ImageInput";

export default function useAuth0Form(user_id?: string) {
  const getFormsFields = React.useMemo(
    () => [
      {
        type: "string",
        label: "User Avatar",
        name: "picture",
        defaultValue: "",
        validate: true,
        Field: (cell: any) => {
          return (
            <div className="flex flex-col">
              <div className="flex space-x-2 font-medium">
                <p className="text-gray-600">user_id: </p>
                <code className="h-fit w-fit p-1 rounded-md bg-gray-200 text-sm font-medium">
                  {user_id}
                </code>
              </div>
              <ImageInput
                label={cell.label}
                hintText={cell.hint}
                handleChange={(file: any) =>
                  cell.setData({ ...cell.data, picture: file })
                }
                file={cell.data.picture}
              />
            </div>
          );
        },
      },
      {
        type: "string",
        label: "Email",
        name: "email",
        defaultValue: "",
        placeholder: "example@gmail.com",
        validate: true,
        hintText: "user email is compulsory",
      },
      {
        type: "select",
        label: "Email Verify",
        name: "email_verified",
        defaultValue: "",
        options: {
          "1": "verify",
          "0": "pending",
        },
      },
      {
        type: "string",
        label: "Name",
        name: "name",
        defaultValue: "",
        placeholder: "ashish, kuldeep, (Optional) etc",
      },
      {
        type: "string",
        label: "Nick Name",
        name: "nickname",
        defaultValue: "",
        placeholder: "ashish, kuldeep, (Optional) etc",
      },
    ],
    []
  );
  return { getFormsFields };
}
