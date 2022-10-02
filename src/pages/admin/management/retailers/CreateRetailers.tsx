import MainContainer from "../../../../components/common/MainContainer";
import { CreateAutoForm } from "../../../../components/form";
import { retailer } from "../../../../http";
import useFormRetailer from "./useFormRetailer";

export default function CreateRetailers() {
  const { getFormsFields } = useFormRetailer();

  return (
    <MainContainer heading="Retailer Details">
      <div className="w-full md:w-[30] lg:w-[30rem]">
        <CreateAutoForm axiosFunction={retailer} fields={getFormsFields} />
      </div>
    </MainContainer>
  );
}
