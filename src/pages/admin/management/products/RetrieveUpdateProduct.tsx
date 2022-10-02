import MainContainer from "../../../../components/common/MainContainer";
import { RetrieveUpdateAutoForm } from "../../../../components/form";
import { shopProducts } from "../../../../http";
import useFormProducts from "./useFormProducts";
import { useParams } from "react-router-dom";

export default function RetrieveUpdateProduct() {
  const { getFormsFields } = useFormProducts();

  const { sku_id } = useParams();

  const retrieveOnRun = (filterData: any, originalData: any) => {
    return {
      ...filterData,
      subcategory_id: `${originalData.subcategory_id}`,
    };
  };

  return (
    <MainContainer heading="Category Details">
      <div className="w-full md:w-[30] lg:w-[30rem]">
        <RetrieveUpdateAutoForm
          axiosFunction={shopProducts}
          params={sku_id}
          fields={getFormsFields}
          setDefaultValue={{ subcategory_id: "" }}
          retrieveBeforeCallBack={retrieveOnRun}
        />
      </div>
    </MainContainer>
  );
}
