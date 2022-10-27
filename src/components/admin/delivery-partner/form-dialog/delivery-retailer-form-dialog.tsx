import {
  Box,
  MenuItem,
  Select,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import React from "react";
import { useParams } from "react-router-dom";
import { deliveryRetailer, retailer as retailerHttp } from "../../../../http";

function DeliveryRetailerFormDialog(props: {
  open: boolean;
  close: () => void;
  reload: () => void;
}) {
  const { partner_id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { open, close, reload } = props;

  const [retailers, setRetailers] = React.useState<
    Array<{ [key: string]: any }>
  >([]);
  const [retailerId, setRetailerId] = React.useState("");

  const retailersGet = React.useCallback(async () => {
    try {
      let res = await retailerHttp("get");
      if (res?.status === 200) {
        let {
          data: { totalItems, retailers, totalPages },
        } = res;

        if (totalPages > 1) {
          res = await retailerHttp("get", {
            postfix: `?page=0&size=${totalItems}`,
          });
          if (res?.status === 200) {
            let {
              data: { retailers },
            } = res;
            return setRetailers(retailers);
          }
        }
        return setRetailers(retailers);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSave = async () => {
    if (!retailerId) {
      enqueueSnackbar("Retailer Missing!", {
        variant: "error",
      });
      return;
    }
    try {
      const res = await deliveryRetailer("post", {
        data: JSON.stringify({
          retailer_id: retailerId,
          partner_id,
        }),
      });
      if (res?.status === 200) {
        close();
        reload();
        setTimeout(() => {
          enqueueSnackbar("Delivery Retailer Save successfully!👍😊", {
            variant: "success",
          });
        }, 200);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Delivery Retailer Saved Failed!😢", {
        variant: "error",
      });
    }
  };

  React.useEffect(() => {
    retailersGet();
  }, []);

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Delivery Retailer</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 1 }}>
          <Typography
            component={"label"}
            sx={{ display: "block", color: "#6b7280", fontWeight: 600 }}
          >
            Retailers
          </Typography>
          <Select
            fullWidth
            color="secondary"
            sx={{
              fontSize: "small",
              ".MuiSelect-select": {
                p: 1,
              },
            }}
            name="retailer_id"
            value={retailerId}
            onChange={(e) => {
              setRetailerId(e.target.value);
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem sx={{ fontSize: "small" }} value="">
              <em>None</em>
            </MenuItem>
            {retailers.map((item, index) => (
              <MenuItem
                key={index}
                sx={{ fontSize: "small" }}
                value={item.retailer_id.toString()}
              >
                {item.retailer_name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexFlow: "row-reverse",
          }}
        >
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={onSave}
          >
            Save
          </Button>
          <Button color="secondary" variant="outlined" onClick={close}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(DeliveryRetailerFormDialog);
