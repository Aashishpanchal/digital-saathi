import AdminContainer from "../../../../components/AdminContainer";
import MainContainer from "../../../../components/common/MainContainer";
import { brands } from "../../../../http";
import useFormBrands from "./useFormBrands";
import { CreateAutoForm } from "../../../../components/form";

export default function CreateBrands() {
  const { getFormsFields } = useFormBrands();

  return (
    <AdminContainer>
      <MainContainer heading="Brand Details">
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <CreateAutoForm
            axiosFunction={brands}
            fields={getFormsFields}
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
