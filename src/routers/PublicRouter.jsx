import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PublicRouter({ children }) {
    const { user, isAuth } = useSelector((state) => state.authSlice);
    const location = useLocation();
    return (<>
      {isAuth && user?.permissions.isActive && user?.permissions.isAdmin ? (<Navigate to="/" state={{ from: location }} replace/>) : (children)}
    </>);
}
