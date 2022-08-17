import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { CreateAutoForm } from "../../../../../components/form";
import { shopProductImages } from "../../../../../http";
import useFormProductImages from "./useFormProductImages";

export default function ShopProductUploadImage() {
  const { sku_name, sku_id } = useParams();
  const { getFormsFields } = useFormProductImages();

  return (
    <AdminContainer>
      <MainContainer heading={`${sku_name} / Details`}>
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <CreateAutoForm
            axiosFunction={shopProductImages}
            fields={getFormsFields}
            extraPostData={{ sku_id }}
            imageOption={{
              key: "image",
              subDirName: "product-images",
            }}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
