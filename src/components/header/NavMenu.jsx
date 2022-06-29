import React from "react";
import { MdLogout } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { HiLockClosed } from "react-icons/hi";
import { Dropdown } from "flowbite-react";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
export default function NavMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(setLogout());
    };
    const onChangePassword = () => {
        navigate("/user/change-password");
    };
    return (<Dropdown label={<div className="flex justify-center items-center">
          <AiOutlineUser size={30} className="dark:text-gray-200"/>
          <div className="text-left mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block lg:block">
            admin
            <div className="text-xs font-medium">Aashish</div>
          </div>
        </div>} arrowIcon={false} inline={true} className="text-left mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:block lg:block">
      <Dropdown.Item onClick={onChangePassword}>
        <div className="flex items-center space-x-2">
          <HiLockClosed size={20}/> <span> Change Password</span>
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={logout}>
        <div className="flex items-center space-x-2">
          <MdLogout size={20}/> <span> Sign out</span>
        </div>
      </Dropdown.Item>
    </Dropdown>);
}
