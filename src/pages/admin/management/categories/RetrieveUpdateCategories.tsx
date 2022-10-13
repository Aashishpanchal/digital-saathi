import MainContainer from "../../../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../../../components/form";
import { categories } from "../../../../http";
import useFormCategories from "./useFormCategories";
import { useParams } from "react-router-dom";

export default function RetrieveUpdateCategories() {
  const { getFormsFields } = useFormCategories();
  const params = useParams();

  return (
    <MainContainer heading="Category Details">
      <div className="w-full md:w-[30] lg:w-[30rem]">
        <RetrieveUpdateAutoForm
          axiosFunction={categories}
          fields={getFormsFields}
          params={params.id}
          imageOption={{
            key: "image",
            subDirName: "category-images",
          }}
        />
      </div>
    </MainContainer>
  );
}
