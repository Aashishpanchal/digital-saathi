import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarOpenClose } from "../../redux/slices/sideBarSlice";
export default function CloseAction() {
    const sideBar = useSelector((state) => state.sideBarSlice.open);
    const dispatch = useDispatch();
    const onToggleSideBar = () => {
        dispatch(setSideBarOpenClose(!sideBar));
    };
    return (<div className="cursor-pointer block sm:hidden md:hidden lg:hidden text-gray-400 hover:text-gray-200 text-lg mr-2">
      <MdClose size={30} onClick={onToggleSideBar}/>
    </div>);
}
