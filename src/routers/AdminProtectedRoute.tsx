import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setAuth } from "../redux/slices/authSlice";

export default function AdminProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, isAuth } = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    const values = localStorage.getItem("user-detail");
    if (values) {
      const { username } = JSON.parse(values);
      dispatch(
        setAuth({
          id: "4545",
          email: "",
          username: username,
          permissions: {
            isAdmin: true,
            isActive: true,
          },
        })
      );
    }
  }, []);

  return (
    <>
      {isAuth && user?.permissions.isActive && user?.permissions.isAdmin ? (
        children
      ) : (
        <Navigate to="/auth/login" state={{ from: location }} replace />
      )}
    </>
  );
}
