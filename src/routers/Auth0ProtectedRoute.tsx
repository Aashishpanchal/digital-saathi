import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Auth0ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isAuthenticationByAuth0 } = useSelector(
    (state: RootState) => state.auth0Slice
  );
  const location = useLocation();

  return (
    <>
      {isAuthenticationByAuth0 ? (
        children
      ) : (
        <Navigate to={-1 as any} state={{ from: location }} />
      )}
    </>
  );
}
