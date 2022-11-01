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
import { useNavigate } from "react-router-dom";

export default function CreateProducts() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: productSchema,
    async onSubmit(values) {
      shopProducts("post", {
        data: JSON.stringify(values),
      })
        ?.then((res) => {
          if (res.status === 200) {
            navigate(-1);
            setTimeout(() => {
              enqueueSnackbar("Product Save  successfully!👍😊", {
                variant: "success",
              });
            }, 200);
          }
        })
        .catch((err) => {
          enqueueSnackbar("Product Save Failed!😢", { variant: "error" });
        });
    },
  });

  return (
    <MainContainer>
      <Container>
        <Typography variant="h5">Add New Product</Typography>
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
                  Save
                </Button>
                <LinkRouter to={-1}>
                  <Button color="secondary" variant="outlined">
                    Close
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
