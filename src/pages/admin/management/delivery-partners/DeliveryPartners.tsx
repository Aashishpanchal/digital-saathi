import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "../../../../components/layout";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import DeliveryPartnerList from "../../../../components/admin/delivery-partner/delivery-partner-list";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../../../redux/slices/admin-slice";
import exportFromJSON from "export-from-json";
import { deliveryPartners } from "../../../../http";

export default function DeliveryPartner() {
  const [searchText, setSearchText] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchHandler = (value: string) => {
    setSearchText(value ? `/search?search_partner=${value}` : "");
  };

  const exportHandler = async () => {
    try {
      dispatch(setPageLoading(true));
      const res = await deliveryPartners("get", {
        postfix: searchText,
      });
      if (res?.status === 200) {
        exportFromJSON({
          data: res.data,
          fileName: `delivery-partner-csv`,
          exportType: "csv",
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setPageLoading(false));
  };
  return (
    <MainContainer>
      <CommonToolbar
        title="Delivery Partner"
        onClickExport={exportHandler}
        onSearch={searchHandler}
        onAddProps={{
          title: "Add Delivery Partner",
          onClick() {
            navigate("new");
          },
        }}
      />
      <Box sx={{ mt: 2 }}>
        <DeliveryPartnerList searchText={searchText} />
      </Box>
    </MainContainer>
  );
}
