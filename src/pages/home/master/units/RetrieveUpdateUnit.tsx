import { useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../../../components/form";
import { shopUnits } from "../../../../http";
import useFormUnits from "./useFormUnits";

export default function RetrieveUpdateUnit() {
  const { units_id } = useParams();
  const { getFormsFields } = useFormUnits();

  return (
    <AdminContainer>
      <MainContainer heading="Unit Details">
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <RetrieveUpdateAutoForm
            axiosFunction={shopUnits}
            fields={getFormsFields}
            params={units_id}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
