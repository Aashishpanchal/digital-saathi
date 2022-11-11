import React from "react";
import Box from "@mui/material/Box";
import { MainContainer } from "../../../../components/layout";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import DeliveryChargesList from "../../../../components/admin/delivery-charge/delivery-charges-list";
import { TbTruckDelivery } from "react-icons/tb";

export default function DeliveryCharges() {
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

  const searchHandler = (value: string) =>
    setSearchText(value ? `?search_delivery_charges=${value}` : "");

  return (
    <MainContainer>
      <CommonToolbar
        title="Delivery Charges"
        icon={<TbTruckDelivery/>}
        onAddProps={{
          title: "Add Delivery Charge",
          onClick: onAdd,
        }}
        onSearch={searchHandler}
      />
      <Box sx={{ mt: 2 }}>
        <DeliveryChargesList
          searchText={searchText}
          addOpen={open}
          addClose={onClose}
        />
      </Box>
    </MainContainer>
  );
}
