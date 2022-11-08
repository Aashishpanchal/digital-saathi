import React from "react";
import Box from "@mui/material/Box";
import { Cell } from "react-table";
import { useQuery } from "@tanstack/react-query";
import ProductAvatar from "../../../../components/Image/product-avatar";
import { shopBannerImgDownLoad } from "../../../../http/server-api/server-apis";

export default function BannerImg(props: { cell: Cell }) {
  const {
    cell: {
      value,
      row: { original },
    },
  }: any = props;

  const { data } = useQuery(["download-img-".concat(original.banner_id)], () =>
    shopBannerImgDownLoad(value)
  );

  const img = React.useMemo(() => {
    if (data?.status === 200) return URL.createObjectURL(data.data);
    return "";
  }, [data]);

  return (
    <Box display="flex" justifyContent={"center"}>
      <ProductAvatar
        src={img}
        sx={{ width: 50, height: 50 }}
        variant="rounded"
      />
    </Box>
  );
}
