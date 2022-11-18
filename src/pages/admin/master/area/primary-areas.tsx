import React from "react";
import Box from "@mui/material/Box";
import { MainContainer } from "../../../../components/layout";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import {
  PartnerAreaList,
  RetailerAreaList,
} from "../../../../components/admin/master/area-wise-list";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shopAreas } from "../../../../http";

export default function AreaWiseData() {
  const { area_id } = useParams();
  const [searchRetailer, setSearchRetailer] = React.useState("");
  const [searchPartner, setSearchPartner] = React.useState("");

  const { data } = useQuery(["area-name"], () =>
    shopAreas("get", { params: area_id })
  );

  const areaName = React.useMemo(() => {
    if (data?.status === 200) return data.data.area || "";
    return "";
  }, []);

  const searchHandler = (variant: "retailer" | "partner") => {
    if (variant === "partner")
      return (value: string) => {
        setSearchPartner(value ? `/search?search_area=${value}` : "");
      };
    else if (variant === "retailer")
      return (value: string) => {
        setSearchRetailer(value ? `/search?search_area=${value}` : "");
      };
  };

  return (
    <MainContainer>
      <CommonToolbar title={`${areaName} / Primary Areas`} titleVariant="h6" />
      <CommonToolbar
        title={"Retailer"}
        placeholder="search retailer area"
        onSearch={searchHandler("retailer")}
        titleVariant="subtitle"
      />
      <Box sx={{ mt: 3 }}>
        <RetailerAreaList
          searchText={searchRetailer}
          area_id={area_id as string}
        />
      </Box>
      <CommonToolbar
        title={"Partner"}
        placeholder="search partner area"
        onSearch={searchHandler("partner")}
        titleVariant="subtitle"
      />
      <Box sx={{ mt: 3 }}>
        <PartnerAreaList
          searchText={searchPartner}
          area_id={area_id as string}
        />
      </Box>
    </MainContainer>
  );
}
