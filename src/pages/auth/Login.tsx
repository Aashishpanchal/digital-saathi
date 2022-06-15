import React from "react";
import { useDispatch } from "react-redux";
import BackgroundImage from "../../components/common/BackgroundImage";
import TextInput from "../../components/form/inputs/TextInput";
import { setAuth } from "../../redux/slices/authSlice";

export default function Login() {
  const [loginData, setLoginData] = React.useState({
    username: "",
    password: "",
  });

  // for login
  const dispatch = useDispatch();

  // add onChange event to handle change in input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // please use this function to submit the form
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(
      setAuth({
        id: "4545",
        email: "",
        username: loginData.username,
        permissions: {
          isAdmin: true,
          isActive: true,
        },
      })
    );
  };

  return (
    <BackgroundImage source="/assets/images/login.jpg">
      <div className="w-full md:max-w-sm lg:max-w-sm m-auto bg-white md:rounded-md lg:rounded-md shadow-md dark:bg-gray-800">
        <div className="p-4">
          <div className="flex justify-center">
            <img
              className="w-fit h-fit"
              src="/assets/images/logo.png"
              alt="Logo"
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
              Admin Panel
            </h1>
          </div>
          <form className="mt-6" method="POST">
            <div>
              <TextInput
                label="Username"
                type="text"
                name="username"
                placeholder="admin456"
                onChange={handleChange}
                value={loginData.username}
              />
            </div>
            <div className="mt-4">
              <TextInput
                label="Password"
                type="password"
                name="password"
                placeholder="*********"
                value={loginData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                disabled={!loginData.username || !loginData.password}
                onClick={(e) => handleSubmit(e)}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 py-4 rounded-b-md">
          <h1 className="block text-xs text-center font-medium text-gray-800 dark:text-gray-200">
            Don't share your password with anyone.
          </h1>
        </div>
      </div>
    </BackgroundImage>
  );
}
