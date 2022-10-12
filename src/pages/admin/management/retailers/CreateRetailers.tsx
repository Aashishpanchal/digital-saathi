import { MainContainer } from "../../../../components/layout";
import { retailer } from "../../../../http";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import LinkRouter from "../../../../routers/LinkRouter";
import RetailerForm, {
  initialValues,
} from "../../../../components/admin/retailers/retailer-form";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { retailerSchema } from "../../../../components/admin/retailers/schemas";

export default function CreateRetailers() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: retailerSchema,
      async onSubmit(values) {
        retailer("post", {
          data: JSON.stringify(values),
        })
          ?.then((res) => {
            if (res.status === 200) {
              navigate(-1);
              setTimeout(() => {
                enqueueSnackbar("Product Save Success-Fully!👍😊", {
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
              <RetailerForm
                values={values}
                handleChange={handleChange}
                errors={errors}
                handleBlur={handleBlur}
                touched={touched}
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
