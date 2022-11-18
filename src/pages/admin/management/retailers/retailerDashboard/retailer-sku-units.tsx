import React from "react";
import { Card, CardContent, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { MainContainer } from "../../../../../components/layout";
import {
  RetailerSkuListResults,
  RetailerSkuUnitTab,
} from "../../../../../components/admin/retailers/retailer-sku-units";
import { useQuery } from "@tanstack/react-query";
import { retailer, shopAssignRetailerProducts } from "../../../../../http";
import CommonToolbar from "../../../../../components/admin/common-toolbar";
import useStateWithCallback from "../../../../../hooks/useStateWithCallback";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../../../../redux/slices/admin-slice";
import { addSno } from "../../../../../components/admin/utils";
import { retailerSKUPricingFields } from "../../../../../constants/fields/retailer-fields";

export default function RetailerSkuUnits() {
  const { retailer_id } = useParams();
  const [productTab, setProductTab] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");
  const { state: csvData, updateState: setCsvData } = useStateWithCallback<
    Array<Record<string, any>>
  >([]);
  const ref = React.useRef<any>(null);
  const dispatch = useDispatch();

  const { data } = useQuery(["retailer-name"], () =>
    retailer("get", { params: retailer_id })
  );

  const retailerName = React.useMemo(() => {
    if (data?.status) return data.data?.retailer_name;
    return "";
  }, [data]);

  const filterSearchText = React.useMemo(
    () =>
      searchText
        ? `/${
            productTab === 0 ? "search" : "unassingn_search"
          }?search_product=${searchText}`
        : "",
    [searchText, productTab]
  );

  const exportHandle = async () => {
    try {
      dispatch(setPageLoading(true));
      const res = await shopAssignRetailerProducts("get", {
        params: productTab === 0 ? "" : filterSearchText ? "" : "unassign",
        postfix: filterSearchText
          ? `${filterSearchText}&retailer_id=${retailer_id}`
          : `?retailer_id=${retailer_id}`,
      });
      if (res?.status === 200) {
        let csvData = res.data || [];
        // indexing
        csvData = addSno(csvData);

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
    <>
      <RetailerSkuUnitTab onChange={setProductTab} value={productTab} />
      <MainContainer>
        <Container>
          <CommonToolbar
            title={`${retailerName} / Retailer Orders`}
            onSearch={setSearchText}
            exportProps={{
              ref,
              data: csvData,
              filename: `retailer-sku-${
                productTab === 0 ? "assign" : "unassign"
              }-csv`,
              onClick: exportHandle,
              headers: retailerSKUPricingFields,
            }}
          />
          <Card sx={{ mt: 1 }}>
            <CardContent sx={{ minHeight: 180 }}>
              <RetailerSkuListResults
                key={productTab}
                searchText={filterSearchText}
                variant={productTab === 0 ? "assign" : "unassign"}
                retailerId={retailer_id as string}
              />
            </CardContent>
          </Card>
        </Container>
      </MainContainer>
    </>
  );
}
