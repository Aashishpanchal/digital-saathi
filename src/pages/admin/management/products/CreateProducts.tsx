import MainContainer from "../../../../components/common/MainContainer";
import { CreateAutoForm } from "../../../../components/form";
import { shopProducts } from "../../../../http";
import useFormProducts from "./useFormProducts";

export default function CreateProducts() {
  const { getFormsFields } = useFormProducts();

  return (
    <MainContainer heading="Category Details">
      <div className="w-full md:w-[30] lg:w-[30rem]">
        <CreateAutoForm axiosFunction={shopProducts} fields={getFormsFields} />
      </div>
    </MainContainer>
  );
}
