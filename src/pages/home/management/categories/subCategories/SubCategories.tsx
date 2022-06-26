import React from "react";
// import { Spinner } from "flowbite-react";
import AdminContainer from "../../../../../components/AdminContainer";
import MainContainer from "../../../../../components/common/MainContainer";
import { useParams } from "react-router-dom";

export default function SubCategories() {
  const { parent_category_id, category_name } = useParams();

  return (
    <AdminContainer>
      <MainContainer heading={`${category_name} / Subcategories`}>
        SU
      </MainContainer>
    </AdminContainer>
  );
}
