import React from "react";
import { MainContainer } from "../../../../components/layout";
import { Box } from "@mui/material";
import exportFromJSON from "export-from-json";
import { farmers } from "../../../../http";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../../../redux/slices/admin-slice";
import FarmersListResults from "../../../../components/admin/farmers/farmers-list-results";
import FarmersListToolbar from "../../../../components/admin/farmers/farmers-list-toolbar";

export default function Farmers() {
  const [searchText, setSearchText] = React.useState("");
  const dispatch = useDispatch();

  const searchHandler = async (value: string) => {
    value =
      value.toLowerCase() === "active"
        ? "1"
        : value.toLowerCase() === "deactive"
        ? "0"
        : value;
    setSearchText(value ? `/search?search_customer=${value}` : "");
  };

  const exportHandler = async () => {
    try {
      dispatch(setPageLoading(true));
      const res = await farmers("get", {
        postfix: searchText,
      });
      if (res?.status === 200) {
        dispatch(setPageLoading(false));
        exportFromJSON({
          data: res.data.customers,
          fileName: `products-csv`,
          exportType: "csv",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainContainer>
      <FarmersListToolbar
        onSearch={searchHandler}
        onClickExport={exportHandler}
      />
      <Box sx={{ mt: 3 }}>
        <FarmersListResults searchText={searchText} />
      </Box>
    </MainContainer>
  );
}
