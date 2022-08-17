import { useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../../../components/form";
import { shopPackages } from "../../../../http";
import useFormPackages from "./useFormPackages";

export default function RetrieveUpdatePackage() {
  const { package_id } = useParams();
  const { getFormsFields } = useFormPackages();

  return (
    <AdminContainer>
      <MainContainer heading="Packages Details">
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <RetrieveUpdateAutoForm
            axiosFunction={shopPackages}
            fields={getFormsFields}
            params={package_id}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
