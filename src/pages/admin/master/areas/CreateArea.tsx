import MainContainer from "../../../../components/common/MainContainer";
import { CreateAutoForm } from "../../../../components/form";
import { shopAreas } from "../../../../http";
import useFormAreas from "./useFormAreas";

export default function CreateArea() {
  const { getFormsFields } = useFormAreas();

  return (
    <MainContainer heading="Area Details">
      <div className="w-full md:w-[30] lg:w-[30rem]">
        <CreateAutoForm axiosFunction={shopAreas} fields={getFormsFields} />
      </div>
    </MainContainer>
  );
}
