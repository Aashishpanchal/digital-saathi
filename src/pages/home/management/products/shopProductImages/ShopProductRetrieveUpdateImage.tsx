import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../../../../components/form";
import { shopProductImages } from "../../../../../http";
import useFormProductImages from "./useFormProductImages";

export default function ShopProductRetrieveUpdateImage() {
  const { sku_name, sku_id, image_id } = useParams();
  const { getFormsFields } = useFormProductImages();

  return (
    <AdminContainer>
      <MainContainer heading={`${sku_name} / Details`}>
        <div className="w-full md:w-[30] lg:w-[30rem]">
          <RetrieveUpdateAutoForm
            axiosFunction={shopProductImages}
            fields={getFormsFields}
            params={image_id}
            imageOption={{
              key: "image",
              subDirName: "product-images",
            }}
            extraPostData={{ sku_id }}
          />
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
