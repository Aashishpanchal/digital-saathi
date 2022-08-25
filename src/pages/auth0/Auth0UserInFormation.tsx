import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AdminContainer from "../../components/AdminContainer";
import MainContainer from "../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../components/form";
import { getUser, updateUser } from "../../http";
import { setInformationModal } from "../../redux/slices/modalSlice";
import useAuth0Form from "./useAuth0Form";

export default function UserInFormation() {
  const { auth0_id } = useParams();
  const { getFormsFields } = useAuth0Form(auth0_id);
  const dispatch = useDispatch();

  const request = (method: "get" | "put", data: any) => {
    if (method === "get") {
      return getUser(encodeURI(auth0_id as string));
    } else {
      return updateUser(data.params, data.data);
    }
  };

  const onGetError = (error: any) => {
    const { response } = error;
    const { data } = response;
    if (response?.status === 404) {
      dispatch(
        setInformationModal({
          show: true,
          runClose: true,
          showLoading: false,
          closeToBack: true,
          heading: data.error,
          title: data.errorCode,
          message: data.message,
        })
      );
    } else if (response?.status === 400) {
      dispatch(
        setInformationModal({
          show: true,
          runClose: true,
          showLoading: false,
          closeToBack: true,
          heading: data.error,
          title: data.errorCode,
          message: data.message,
        })
      );
    }
  };

  return (
    <AdminContainer>
      <MainContainer heading="User Information">
        {/* user container */}
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <RetrieveUpdateAutoForm
            fields={getFormsFields}
            axiosFunction={request}
            retrieveBeforeCallBack={(data) => ({
              ...data,
              email_verified: data.email_verified ? "1" : "0",
            })}
            updateBeforeCallBack={(data) => ({
              ...data,
              email_verified: data.email_verified === "1" ? true : false,
            })}
            params={auth0_id}
            onGetError={onGetError}
            imageOption={{
              key: "picture",
              subDirName: "user-images",
            }}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
