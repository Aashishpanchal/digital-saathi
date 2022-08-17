import { useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../../../components/form";
import { shopAreas } from "../../../../http";
import useFormAreas from "./useFormAreas";

export default function RetrieveUpdateArea() {
  const { area_id } = useParams();
  const { getFormsFields } = useFormAreas();

  return (
    <AdminContainer>
      <MainContainer heading="Area Details">
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <RetrieveUpdateAutoForm
            axiosFunction={shopAreas}
            fields={getFormsFields}
            params={area_id}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
