import { useDispatch, useSelector } from "react-redux";

import React, { useEffect } from "react";
import { getAuth0AdminToken } from "../http/auth0-api/auth0-base";
import { setAuth } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";

export default function useLoadingWithAuth0() {
  const [loading, setLoading] = React.useState(true);
  const { isAuth } = useSelector((state: RootState) => state.authSlice);

  const dispatch = useDispatch();

  const onGetToken = async () => {
    setLoading(true);
    try {
      const res = await getAuth0AdminToken();
      if (res.status === 200) {
        dispatch(setAuth(res.data));
      }
    } catch (error: any) {
      console.log(error.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuth) {
      onGetToken();
    }
  }, [isAuth]);

  return { loading };
}
