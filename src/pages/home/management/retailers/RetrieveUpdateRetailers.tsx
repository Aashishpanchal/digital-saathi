import { useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../../../components/form";
import { retailer } from "../../../../http";
import useFormRetailer from "./useFormRetailer";

export default function RetrieveUpdateRetailers() {
  const { retailer_id } = useParams();
  const { getFormsFields } = useFormRetailer();

  return (
    <AdminContainer>
      <MainContainer heading="Edit User">
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <RetrieveUpdateAutoForm
            axiosFunction={retailer}
            fields={getFormsFields}
            params={retailer_id}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
