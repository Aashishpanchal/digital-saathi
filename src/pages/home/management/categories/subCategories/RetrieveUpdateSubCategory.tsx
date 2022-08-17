import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { useParams } from "react-router-dom";
import { subCategories } from "../../../../../http";
import { RetrieveUpdateAutoForm } from "../../../../../components/form";
import useFormSubCategories from "./useFormSubCategories";

export default function RetrieveUpdateSubCategory() {
  const { category_name, subcategory_id } = useParams();
  const { getFormsFields } = useFormSubCategories();

  return (
    <AdminContainer>
      <MainContainer heading={`${category_name} / Subcategories Detail`}>
        <div className="w-full md:w-[28rem] lg:w-[28rem]">
          <RetrieveUpdateAutoForm
            axiosFunction={subCategories}
            fields={getFormsFields}
            params={subcategory_id}
            imageOption={{
              key: "image",
              subDirName: "sub-category-images",
            }}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
