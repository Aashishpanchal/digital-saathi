import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { CreateAutoForm } from "../../../../components/form";
import { shopUnits } from "../../../../http";
import useFormUnits from "./useFormUnits";

export default function CreateUnit() {
  const { getFormsFields } = useFormUnits();

  return (
    <AdminContainer>
      <MainContainer heading="Units Details">
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <CreateAutoForm axiosFunction={shopUnits} fields={getFormsFields} />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
