import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { TextInput } from "../../../form";
import { shopDeliveryAgent } from "../../../../http";
import { deliveryAgentSchema } from "../schemas";
import { useParams } from "react-router-dom";

export default function deliveryAgentFormDialog(props: {
  open: boolean;
  deliveryAgent: { [key: string]: any } | null;
  variant: "edit" | "save";
  close: () => void;
  reload: () => void;
}) {
  const { open, close, deliveryAgent, reload, variant } = props;
  const { enqueueSnackbar } = useSnackbar();

  const { partner_id } = useParams();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        agent_name: deliveryAgent?.agent_name || "",
        email_id: deliveryAgent?.email_id || "",
        phone_no: deliveryAgent?.phone_no || "+91 ",
      },
      validationSchema: deliveryAgentSchema,
      enableReinitialize: true,
      async onSubmit(values) {
        if (variant === "edit" && deliveryAgent) {
          try {
            const res = await shopDeliveryAgent("put", {
              params: deliveryAgent.agent_id,
              data: JSON.stringify({ ...values, partner_id }),
            });
            if (res?.status === 200) {
              close();
              reload();
              setTimeout(() => {
                enqueueSnackbar("Delivery Agent Update successfully!👍😊", {
                  variant: "success",
                });
              }, 200);
            }
          } catch (error) {
            console.log(error);
            enqueueSnackbar("Delivery Agent Update Failed!😢", {
              variant: "error",
            });
          }
        } else {
          try {
            const res = await shopDeliveryAgent("post", {
              data: JSON.stringify({ ...values, partner_id }),
            });
            if (res?.status === 200) {
              close();
              reload();
              setTimeout(() => {
                enqueueSnackbar("Delivery Agent successfully!👍😊", {
                  variant: "success",
                });
              }, 200);
            }
          } catch (error) {
            console.log(error);
            enqueueSnackbar("Delivery Agent Save Failed!😢", {
              variant: "error",
            });
          }
        }
      },
    });

  const basicFields = React.useMemo(
    () => [
      {
        type: "text",
        label: "Agent Name",
        name: "agent_name",
        placeholder: "agent name",
      },
      {
        type: "text",
        label: "Email",
        name: "email_id",
        placeholder: "email",
      },
      {
        type: "text",
        label: "Phone Number",
        name: "phone_no",
        placeholder: "phone number",
      },
    ],
    []
  );

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        Delivery Agent {variant === "edit" ? "Edit" : "Add"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {basicFields.map((item, index) => (
            <TextInput
              key={index}
              {...item}
              name={item.name}
              value={(values as any)[item.name] || ""}
              onChange={handleChange}
              error={
                (errors as any)[item.name] && (touched as any)[item.name]
                  ? true
                  : false
              }
              helperText={
                (touched as any)[item.name] ? (errors as any)[item.name] : ""
              }
              onBlur={handleBlur}
            />
          ))}
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexFlow: "row-reverse",
            }}
          >
            <Button type="submit" color="secondary" variant="contained">
              <span className="first-letter:uppercase">{variant}</span>
            </Button>
            <Button color="secondary" variant="outlined" onClick={close}>
              Close
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
