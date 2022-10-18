import React from "react";
import { useDispatch } from "react-redux";
import { FormRender } from "../../components/form";
import { useForms } from "../../hooks/forms";
import { setAuth } from "../../redux/slices/authSlice";
import useLoginForm from "./useLoginForm";

import logo from "../../assets/logo.png";

export default function Login() {
  const { getFormsFields } = useLoginForm();
  const { data, setData, onValidate, errors } = useForms({
    fields: getFormsFields,
  });

  // for login
  const dispatch = useDispatch();

  // please use this function to submit the form
  const onLogin = () => {
    if (onValidate()) {
      dispatch(
        setAuth({
          id: "4545",
          email: "",
          username: data.username,
          permissions: {
            isAdmin: true,
            isActive: true,
          },
        })
      );
    }
  };

  return (
    <div className="bg-cover h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full md:max-w-sm lg:max-w-sm m-auto bg-white md:rounded-md lg:rounded-md shadow-md dark:bg-gray-800">
        <div className="p-4">
          <div className="flex justify-center">
            <img className="w-fit h-fit" src={logo} alt="Logo" />
          </div>
          <div className="w-full flex justify-center items-center">
            <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
              Admin Panel
            </h1>
          </div>
          <FormRender
            data={data}
            setData={setData}
            fields={getFormsFields}
            errors={errors}
            showCancel={true}
          >
            <div className="mt-6">
              <button
                type="submit"
                className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-light rounded-md hover:bg-blue-light focus:outline-none"
                onClick={onLogin}
              >
                Log in
              </button>
            </div>
          </FormRender>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 py-4 rounded-b-md">
          <h1 className="block text-xs text-center font-medium text-gray-800 dark:text-gray-200">
            Don't share your password with anyone.
          </h1>
        </div>
      </div>
    </div>
  );
}
