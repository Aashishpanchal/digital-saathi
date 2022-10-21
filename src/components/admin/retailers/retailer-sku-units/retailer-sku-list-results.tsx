import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { shopAssignRetailerProducts } from "../../../../http";
import TablePagination from "../../../table/table-pagination";
import RawDataNotFound from "../../raw-data-not-found";
import SkuCard from "./sku-card";

function RetailerSkuListResults(props: { retailerId: string; tab: number }) {
  const { retailerId, tab } = props;

  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    products: [],
  });
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState("12");

  const { enqueueSnackbar } = useSnackbar();

  const onGet = async () => {
    try {
      setLoading(true);
      const res = await shopAssignRetailerProducts("get", {
        params: tab === 0 ? "" : "unassign",
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

  const onClickHandle = async (sku: { [key: string]: any }) => {
    if (tab === 0) {
      const { assign_id, product_price_id } = sku;
      try {
        const res = await shopAssignRetailerProducts("delete", {
          params: "delete",
          postfix: `?assign_id=${assign_id}&product_price_id=${product_price_id}`,
        });
        if (res?.status === 200) {
          enqueueSnackbar("Product Un-Assign Success-Fully!👍😊", {
            variant: "success",
          });
          await onGet();
        }
      } catch (error) {
        enqueueSnackbar("Product Un-Assign Failed!😢", {
          variant: "error",
        });
        console.log(error);
      }
    } else {
      const { sku_id, price_id, price: sale_price } = sku;
      try {
        const res = await shopAssignRetailerProducts("post", {
          data: JSON.stringify({
            sku_id,
            price_id,
            sale_price,
            retailer_id: retailerId,
          }),
        });
        if (res?.status === 200) {
          enqueueSnackbar("Product Assign Success-Fully!👍😊", {
            variant: "success",
          });
          await onGet();
        }
      } catch (error) {
        enqueueSnackbar("Product Assign Failed!😢", {
          variant: "error",
        });
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    onGet();
  }, [page, size, tab]);

  React.useEffect(() => {
    setPage(0);
    setSize("12");
  }, [tab]);

  return (
    <>
      <Box display={"flex"} justifyContent="center" flexWrap={"wrap"} gap={2}>
        {loading ? (
          <CircularProgress color="secondary" sx={{ alignSelf: "center" }} />
        ) : data.totalItems === 0 ? (
          <RawDataNotFound />
        ) : (
          products.map((item, index) => (
            <SkuCard
              key={index}
              sku={item}
              variant={tab !== 0 ? "assign" : "unassign"}
              onClick={onClickHandle}
            />
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

export default React.memo(RetailerSkuListResults);
