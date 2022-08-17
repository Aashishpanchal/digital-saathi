import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { CreateAutoForm } from "../../../../components/form";
import { shopPackages } from "../../../../http";
import useFormPackages from "./useFormPackages";

export default function CreatePackage() {
  const { getFormsFields } = useFormPackages();

  return (
    <AdminContainer>
      <MainContainer heading="Packages Details">
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <CreateAutoForm
            axiosFunction={shopPackages}
            fields={getFormsFields}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
