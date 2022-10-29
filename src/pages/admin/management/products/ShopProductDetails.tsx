import React from "react";
import { FaPrint } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { MainContainer } from "../../../../components/layout";
import {
  shopProductImages,
  shopProducts,
  shopProductWeightPrice,
} from "../../../../http";
import { useReactToPrint } from "react-to-print";
import {
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import usePrintData from "../../../../hooks/usePrintData";
import CardMedia from "@mui/material/CardMedia";

const productLabels = [
  { label: "SKU Name", accessor: "sku_name" },
  { label: "SKU Name Kannada", accessor: "sku_name_kannada" },
  { label: "SKU Code", accessor: "sku_code" },
  { label: "Category", accessor: "category_id" },
  { label: "Sub Category", accessor: "subcategory_id" },
  { label: "Brand", accessor: "brand_id" },
  { label: "HSN Code", accessor: "hsn_code" },
  { label: "Description", accessor: "description" },
];

const productPriceLabels = [
  {
    label: "Price",
    accessor: "price",
    Cell: (cell: any) => <>₹{cell.value}</>,
  },
  { label: "MRP", accessor: "mrp", Cell: (cell: any) => <>₹{cell.value}</> },
  { label: "GST", accessor: "igst" },
  { label: "Weight", accessor: "weight" },
  { label: "Package", accessor: "package" },
  { label: "Units Per Case", accessor: "units_per_case" },
];

export default function ShopProductDetails() {
  const { sku_id } = useParams();
  const [productData, setProductData] = React.useState<Record<string, any>>({});
  const [productPriceData, setProductPriceData] = React.useState<
    Record<string, any>
  >({});
  const [productImageData, setProductImageData] = React.useState<Array<any>>(
    []
  );
  let componentRef = React.useRef<any>(null);

  const { printData: obj1 } = usePrintData({
    labels: productLabels,
    data: productData,
  });

  const { printData: obj2 } = usePrintData({
    labels: productPriceLabels,
    data: productPriceData,
  });

  const getData = async () => {
    try {
      let res = await shopProducts("get", { params: sku_id });
      if (res?.status === 200) {
        setProductData(res.data);
      }
      res = await shopProductWeightPrice("get", {
        postfix: `?sku_id=${sku_id}`,
      });

      if (res?.status === 200) {
        setProductPriceData(res.data.product_prices[0] || {});
      }

      res = await shopProductImages("get", {
        postfix: `?sku_id=${sku_id}`,
      });
      if (res?.status === 200) {
        setProductImageData(res.data.product_images);
      }
    } catch (err: any) {
      console.log(err?.response);
    }
  };

  const pageStyle = `
  @media all {
    .page-break {
      display: none;
    }
  }
  
  @media print {
    html, body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
    body {
      -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
      -ms-filter: grayscale(100%);
      filter: grayscale(100%);
    }
  }
  
  @media print {
    .page-break {
      margin-top: 1rem;
      display: block;
      page-break-before: auto;
    }
  }
  
  @page {
    size: auto;
    margin: 20mm;
  }
`;
  const onPrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
  });

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <MainContainer>
      <Container>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            my: 1,
          }}
        >
          <Typography variant="h5">
            {productData?.sku_name} / Product Details
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<FaPrint />}
            onClick={onPrint}
          >
            Print
          </Button>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          component="div"
          ref={componentRef}
        >
          {/* Card One */}
          <Card elevation={5}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                View Product
              </Typography>
              <Grid container>
                {obj1.map((item, index) => (
                  <Grid key={index} item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign={"justify"}
                    >
                      <strong>{item.get("label")}: </strong>
                      {item.get("Cell")}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
          {/* Card Two */}
          <Card elevation={5}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Product Price
              </Typography>
              <Grid container>
                {obj2.map((item, index) => (
                  <Grid key={index} item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{item.get("label")}: </strong>
                      {item.get("Cell")}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
          {/* Card three */}
          {productImageData.length !== 0 && (
            <Card elevation={5}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Product Images
                </Typography>
                <Grid container spacing={2}>
                  {productImageData.map((item, index) => (
                    <Grid key={index} item xs={4}>
                      <Card sx={{ maxWidth: 245 }} elevation={5}>
                        <CardMedia
                          component={"img"}
                          image={item?.image}
                          sx={{ height: 120 }}
                        />
                        <Typography
                          px={1}
                          gutterBottom
                          variant="h6"
                          component="div"
                        >
                          {item.title}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}
        </Box>
      </Container>
    </MainContainer>
  );
}
