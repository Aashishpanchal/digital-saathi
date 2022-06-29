import React from "react";
// import DarkThemeToggle from "../button/DarkThemeToggle";
import NavMenu from "./NavMenu";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarOpenClose } from "../../redux/slices/sideBarSlice";
export default function Header() {
    const sideBar = useSelector((state) => state.sideBarSlice.open);
    const dispatch = useDispatch();
    const onToggleSideBar = () => {
        dispatch(setSideBarOpenClose(!sideBar));
    };
    return (<nav className="bg-white border-b border-gray-400 dark:bg-gray-800">
      <div className="px-6 py-3">
        <div className="md:flex md:items-center md:justify-between">
          <div className="w-full flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-700">
              <BsMenuButtonWideFill size={25} className="text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:cursor-pointer" onClick={onToggleSideBar}/>
            </div>
            <div className="flex items-center mt-0 relative">
              {/* <DarkThemeToggle /> */}
              <NavMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>);
}
