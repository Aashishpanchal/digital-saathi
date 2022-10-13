import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductListImages from "../../../../components/admin/products/product-list-images";
import { MainContainer } from "../../../../components/layout";

export default function ProductImages() {
  const { sku_id, sku_name } = useParams();
  const [open, setOpen] = React.useState(false);

  const onUpload = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <MainContainer>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h5">
          Product Images / {sku_name}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="secondary" variant="contained" onClick={onUpload}>
            Upload Image
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <ProductListImages
          sku_id={sku_id as string}
          uploadOpen={open}
          uploadClose={onClose}
        />
      </Box>
    </MainContainer>
  );
}
