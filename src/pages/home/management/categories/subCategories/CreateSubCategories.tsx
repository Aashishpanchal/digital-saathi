import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { useParams } from "react-router-dom";
import { subCategories } from "../../../../../http";
import useFormSubCategories from "./useFormSubCategories";
import { CreateAutoForm } from "../../../../../components/form";

export default function CreateSubCategories() {
  const { parent_category_id, category_name } = useParams();
  const { getFormsFields } = useFormSubCategories();

  return (
    <AdminContainer>
      <MainContainer heading={`${category_name} / Subcategories Detail`}>
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <CreateAutoForm
            axiosFunction={subCategories}
            extraPostData={{ parent_category_id }}
            fields={getFormsFields}
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
