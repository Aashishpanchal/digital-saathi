import React from "react";
import { MainContainer } from "../../../../../components/layout";
import { Box } from "@mui/material";
import OrdersToolbar, {
  type DatesType,
} from "../../../../../components/admin/orders/orders-toolbar";
import OrdersListResults from "../../../../../components/admin/orders/orders-list-results";
import { useParams } from "react-router-dom";
import { queryToStr } from "../../../../../components/admin/utils";
import { useQuery } from "@tanstack/react-query";
import { retailer } from "../../../../../http";

export default function RetailerOrderCancelled() {
  const [searchText, setSearchText] = React.useState("");
  const { retailer_id } = useParams();

  const { data } = useQuery(["retailer-name"], () =>
    retailer("get", { params: retailer_id })
  );

  const retailerName = React.useMemo(() => {
    if (data?.status) return data.data?.retailer_name;
    return "no name";
  }, [data]);

  const searchHandler = (value: string, dates: DatesType) => {
    if (dates.from && dates.to) {
      setSearchText(
        "?" +
          queryToStr({
            date_from: dates.from.format("YYYY-MM-DD"),
            date_to: dates.to.format("YYYY-MM-DD"),
          })
      );
    } else {
      setSearchText("");
    }
  };

  return (
    <MainContainer>
      <OrdersToolbar onSearch={searchHandler}>
        Cancelled Orders of {retailerName}
      </OrdersToolbar>
      <Box sx={{ mt: 3 }}>
        <OrdersListResults
          params="retailer"
          orderStatus={7 /*[7, 9, 10]*/}
          searchText={searchText}
          otherQuery={{ retailer_id }}
        />
      </Box>
    </MainContainer>
  );
}
