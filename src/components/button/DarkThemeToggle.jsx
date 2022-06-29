import React from "react";
import { ToggleSwitch } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { setDark } from "../../redux/slices/themeSlice";
import { MdLightMode, MdDarkMode } from "react-icons/md";
export default function Toggle() {
    const isDark = useSelector((state) => state.themeSlice.isDark);
    const dispatch = useDispatch();
    return (<div className="mr-6 flex justify-center space-x-2 items-center">
      <ToggleSwitch checked={isDark} label={isDark ? "Dark" : "Light"} onChange={function (checked) {
            dispatch(setDark(checked));
        }}/>
      {isDark ? (<MdDarkMode size={24} color="#fff"/>) : (<MdLightMode size={24}/>)}
    </div>);
}
