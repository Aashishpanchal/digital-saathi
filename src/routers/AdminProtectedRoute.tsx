import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function AdminProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, isAuth } = useSelector((state: RootState) => state.authSlice);
  const location = useLocation();

  return (
    <>
      {isAuth && user?.permissions.isActive && user?.permissions.isAdmin ? (
        children
      ) : (
        <Navigate to="auth/login" state={{ from: location }} replace />
      )}
    </>
  );
}
