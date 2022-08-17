import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../../../components/form";
import { brands } from "../../../../http";
import useFormBrands from "./useFormBrands";
import { useParams } from "react-router-dom";

export default function RetrieveUpdateBrands() {
  const { getFormsFields } = useFormBrands();
  const params = useParams();

  return (
    <AdminContainer>
      <MainContainer heading="Brand Details">
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <RetrieveUpdateAutoForm
            axiosFunction={brands}
            fields={getFormsFields}
            params={params.id}
            imageOption={{
              key: "brand_image",
              subDirName: "brand-images",
            }}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
