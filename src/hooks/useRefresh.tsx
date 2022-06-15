import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { getProfile } from "../http";
import { setAuth } from "../redux/slices/authSlice";

function useRefresh() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await axios.get(
  //         `${process.env.REACT_APP_API_URL}/auth/api/login/token/refresh/`,
  //         {
  //           withCredentials: true,
  //         }
  //       );

  //       const { data } = await getProfile();
  //       dispatch(setAuth(data));
  //       setLoading(false);
  //     } catch (err: any) {
  //       // console.log(err);
  //       setLoading(false);
  //     }
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return { loading };
}

export default useRefresh;
