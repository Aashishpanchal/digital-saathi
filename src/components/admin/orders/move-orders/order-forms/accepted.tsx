import React from "react";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import { retailer, shopOrders } from "../../../../../http";
import moveOrdersSchemas from "../schemas";
import AsyncAutocomplete from "../../../../form/async-autocomplete";

export default function Accepted(props: {
  onClose: () => void;
  orders: Record<string, any>;
  refetch: Function;
}) {
  const { onClose, orders, refetch } = props;
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { values, errors, touched, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        retailer_id: "",
      },
      validationSchema: moveOrdersSchemas[1],
      async onSubmit(values) {
        try {
          setLoading(true);
          const res = await shopOrders("post", {
            params: "status",
            data: JSON.stringify({
              ...values,
              order_id: orders.order_id,
              invoice_no: orders.invoice_no,
              order_status: 1,
            }),
          });
          if (res?.status === 200) {
            onClose();
            refetch();
            enqueueSnackbar("order move successfully!", {
              variant: "success",
            });
          }
        } catch (error) {
          console.log(error);
          enqueueSnackbar("order move failed!", {
            variant: "error",
          });
        }
        setLoading(false);
      },
    });

  const { isLoading, data } = useQuery(
    ["get-all-retails"],
    () => retailer("get"),
    {
      select(data) {
        if (data?.status === 200) {
          data.data = (data.data || []).map(
            (row: { retailer_name: any; retailer_id: any }) => {
              return {
                ...row,
                retailer_name:
                  row?.retailer_name || row?.retailer_id.toString(),
              };
            }
          );
        }
        return data;
      },
    }
  );

  const retailerOptions = React.useMemo(() => {
    if (data?.status === 200) return data.data || [];
    return [];
  }, [data]);

  return (
    <Box mt={2}>
      <Typography my={1} variant={"h6"}>
        Move order accepted
      </Typography>
      <form onSubmit={handleSubmit}>
        <AsyncAutocomplete
          id="partner-agent-option"
          sx={{ my: 2 }}
          label="Retailer"
          loading={isLoading}
          options={retailerOptions}
          value={values.retailer_id}
          objFilter={{
            title: "retailer_name",
            value: "retailer_id",
          }}
          onChangeOption={(value) => setFieldValue("retailer_id", value)}
          TextInputProps={{
            error: errors.retailer_id && touched.retailer_id ? true : false,
            helperText: touched.retailer_id ? errors.retailer_id : "",
            onBlur: handleBlur,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexFlow: "row-reverse",
            gap: 2,
            my: 1,
          }}
        >
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="small"
            startIcon={
              loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : undefined
            }
          >
            Save
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={onClose}
            size="small"
          >
            Close
          </Button>
        </Box>
      </form>
    </Box>
  );
}
