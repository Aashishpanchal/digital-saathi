import React from "react";
import Box from "@mui/material/Box";
import { MainContainer } from "../../../components/layout";
import CommonToolbar from "../../../components/admin/common-toolbar";
import ComingSoonPage from "../../../components/ComingSoonPage";
import { SiReason } from "react-icons/si";

export default function Reason() {
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

  const searchHandler = (value: string) =>
    setSearchText(value ? `?search_delivery_charges=${value}` : "");

  return (
    <MainContainer>
      <CommonToolbar
        title="Reason"
        icon={<SiReason/>}
        onAddProps={{
          title: "Add Reason",
          onClick: onAdd,
        }}
        onSearch={searchHandler}
      />
      <Box sx={{ mt: 2 }}>
        <ComingSoonPage />
      </Box>
    </MainContainer>
  );
}
