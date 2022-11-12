import React from "react";
import Box from "@mui/material/Box";
import { MainContainer } from "../../../components/layout";
import CommonToolbar from "../../../components/admin/common-toolbar";
import PrimaryRetailerList from "../../../components/admin/master/primary-retailers-list";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shopAreas } from "../../../http";

export default function PrimaryRetailer() {
  const { area_id } = useParams();
  const [searchText, setSearchText] = React.useState("");

  const { data } = useQuery(["area-name"], () =>
    shopAreas("get", { params: area_id })
  );

  const areaName = React.useMemo(() => {
    if (data?.status === 200) return data.data.area || "";
    return "";
  }, []);

  const searchHandler = async (value: string) => {
    setSearchText(value ? `/search?search_area=${value}` : "");
  };

  return (
    <MainContainer>
      <CommonToolbar
        title={`${areaName} / Primary Retailer`}
        onSearch={searchHandler}
      />
      <Box sx={{ mt: 3 }}>
        <PrimaryRetailerList
          searchText={searchText}
          area_id={area_id as string}
        />
      </Box>
    </MainContainer>
  );
}
