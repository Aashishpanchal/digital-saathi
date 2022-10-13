import MainContainer from "../../../../components/common/MainContainer";
import { categories } from "../../../../http";
import useFormCategories from "./useFormCategories";
import { CreateAutoForm } from "../../../../components/form";

export default function CreateFarmers() {
  const { getFormsFields } = useFormCategories();

  return (
    <MainContainer heading="Category Details">
      <div className="w-full md:w-[30] lg:w-[30rem]">
        <CreateAutoForm
          axiosFunction={categories}
          fields={getFormsFields}
          imageOption={{
            key: "image",
            subDirName: "category-images",
          }}
        />
      </div>
    </MainContainer>
  );
}
