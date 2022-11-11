import Box from "@mui/material/Box";
import React from "react";
import CommonToolbar from "../../../components/admin/common-toolbar";
import PackagesList from "../../../components/admin/master/packages-list";
import { MainContainer } from "../../../components/layout";
import { RiShoppingBag3Fill } from "react-icons/ri";

export default function Packages() {
  const [open, setOpen] = React.useState(false);

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <MainContainer>
      <CommonToolbar
        title="Packages"
        icon={<RiShoppingBag3Fill />}
        onAddProps={{ title: "Add Package", onClick: onAdd }}
      />
      <Box sx={{ mt: 3 }}>
        <PackagesList searchText="" addClose={onClose} addOpen={open} />
      </Box>
    </MainContainer>
  );
}
