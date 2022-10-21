import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { shopAssignRetailerProducts } from "../../../../http";
import TablePagination from "../../../table/table-pagination";
import RawDataNotFound from "../../raw-data-not-found";
import SkuPricingCard from "./sku-pricing-card";

function RetailerSkuPricingListResults(props: { retailerId: string }) {
  const { retailerId } = props;

  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    products: [],
  });
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState("12");

  const onGet = async () => {
    try {
      setLoading(true);
      const res = await shopAssignRetailerProducts("get", {
        postfix: `?retailer_id=${retailerId}&page=${page}&size=${size}`,
      });
      if (res?.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const products = React.useMemo(() => data.products, [data]);

  React.useEffect(() => {
    onGet();
  }, [page, size]);

  return (
    <>
      <Box display={"flex"} justifyContent="center" flexWrap={"wrap"} gap={2}>
        {loading ? (
          <CircularProgress color="secondary" sx={{ alignSelf: "center" }} />
        ) : data.totalItems === 0 ? (
          <RawDataNotFound />
        ) : (
          products.map((item, index) => (
            <SkuPricingCard key={index} sku={item} />
          ))
        )}
      </Box>
      <Box mt={3}>
        <TablePagination
          page={page}
          pageSize={size}
          totalItems={data.totalItems}
          count={data.totalPages}
          onChangePage={setPage}
          onPageSizeSelect={setSize}
          sizeArray={[12, 24, 36, 48]}
        />
      </Box>
    </>
  );
}

export default React.memo(RetailerSkuPricingListResults);
