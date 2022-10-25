import React from "react";
import { MainContainer } from "../../../../components/layout";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import ProductBasicForm, {
  initialValues,
} from "../../../../components/admin/products/product-basic-form";
import { useFormik } from "formik";
import { productSchema } from "../../../../components/admin/products/schemas";
import LinkRouter from "../../../../routers/LinkRouter";
import { shopProducts } from "../../../../http";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProducts() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { sku_id } = useParams();
  const [data, setData] = React.useState<{ [key: string]: any }>(initialValues);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validationSchema: productSchema,
    async onSubmit(values, action) {
      try {
        shopProducts("put", {
          params: sku_id,
          data: JSON.stringify(values),
        })
          ?.then((res) => {
            if (res.status === 200) {
              action.resetForm();
              setTimeout(() => {
                enqueueSnackbar("Product Update  successfully!👍😊", {
                  variant: "success",
                });
                navigate(-1);
              }, 200);
            }
          })
          .catch((err) => {
            enqueueSnackbar("Product Update Failed!😢", { variant: "error" });
          });
      } catch (error) {}
    },
  });

  const onRetrieve = async () => {
    try {
      const res = await shopProducts("get", {
        params: sku_id,
      });
      if (res?.status === 200) {
        const {
          data: {
            sku_name,
            sku_name_kannada,
            sku_code,
            hsn_code,
            description,
            category_id,
            subcategory_id,
            brand_id,
          },
        } = res;
        setData({
          sku_name,
          sku_name_kannada,
          sku_code,
          hsn_code,
          description: description ? description : "",
          category_id,
          subcategory_id,
          brand_id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    onRetrieve();
  }, []);

  return (
    <MainContainer>
      <Container>
        <Typography variant="h5">Edit Product</Typography>
        <Card className="lg:col-span-2">
          <CardContent sx={{ pt: 2 }}>
            <form onSubmit={handleSubmit}>
              <ProductBasicForm
                values={values}
                handleChange={handleChange}
                errors={errors}
                handleBlur={handleBlur}
                touched={touched}
                setFieldValue={setFieldValue}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexFlow: "row-reverse",
                }}
              >
                <Button type="submit" color="secondary" variant="contained">
                  Update
                </Button>
                <LinkRouter to={-1}>
                  <Button color="secondary" variant="outlined">
                    Discard
                  </Button>
                </LinkRouter>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </MainContainer>
  );
}
