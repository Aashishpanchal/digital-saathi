import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import FarmersOrdersListResults from "../../../../components/admin/farmers/farmers-orders-list-results";
import { MainContainer } from "../../../../components/layout";
import {
  addSno,
  addTaxNetAmount,
  dateTimeFormatTable,
  margeAsList,
  margeRowTable,
  orderStatusReadable,
} from "../../../../components/admin/utils";
import useStateWithCallback from "../../../../hooks/useStateWithCallback";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../../../redux/slices/admin-slice";
import { shopOrders } from "../../../../http";
import { allOrdersFields } from "../../../../constants";

export default function FarmersOrders() {
  const { customer_id } = useParams();
  const [searchText, setSearchText] = React.useState("");
  const { state: csvData, updateState: setCsvData } = useStateWithCallback<
    Array<Record<string, any>>
  >([]);
  const ref = React.useRef<any>(null);
  const dispatch = useDispatch();

  const searchHandler = async (value: string) => {
    setSearchText(value ? `/search?search_orders=${value}` : "");
  };

  const exportHandle = async () => {
    try {
      dispatch(setPageLoading(true));
      const res = await shopOrders("get", {
        postfix: searchText
          ? `${searchText.replace("/search", "")}&customer_id=${customer_id}`
          : `?customer_id=${customer_id}`,
        params: "csv",
      });
      if (res?.status === 200) {
        let csvData = res.data.orders || [];
        // indexing
        csvData = addSno(csvData);
        // for order date
        csvData = dateTimeFormatTable(csvData, "order_date", "order_time");
        // for delivery date
        csvData = dateTimeFormatTable(
          csvData,
          "delivered_date",
          "delivered_time"
        );
        // marge two column
        csvData = margeRowTable(
          csvData,
          ["retailer_company_name", "retailer_name"],
          "selected_retailer"
        );
        // order readable from
        csvData = orderStatusReadable(csvData);
        // marge list as a farmer shipping address
        csvData = margeAsList(
          csvData,
          [
            "shipping_village",
            "shipping_sub_district",
            "shipping_district",
            "shipping_state",
            "shipping_pincode",
          ],
          "farmer_shipping_address"
        );
        // marge list as a farmer billing address
        csvData = margeAsList(
          csvData,
          [
            "billing_village",
            "billing_sub_district",
            "billing_district",
            "billing_state",
            "billing_pincode",
          ],
          "farmer_billing_address"
        );
        // add tax and net amount
        csvData = addTaxNetAmount(csvData);

        setCsvData(csvData, () => {
          ref.current.link.click();
          dispatch(setPageLoading(false));
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(setPageLoading(false));
    }
  };

  return (
    <MainContainer>
      <CommonToolbar
        title="Farmers Orders"
        onSearch={searchHandler}
        exportProps={{
          ref,
          data: csvData,
          headers: allOrdersFields,
          filename: `farmers-orders-csv`,
          onClick: exportHandle,
        }}
      />
      <Box sx={{ mt: 3 }}>
        <FarmersOrdersListResults
          customerId={customer_id as string}
          searchText={searchText}
        />
      </Box>
    </MainContainer>
  );
}
