import Box from "@mui/material/Box";
import React from "react";
import CommonToolbar from "../../../components/admin/common-toolbar";
import UnitList from "../../../components/admin/master/unit-list";
import { MainContainer } from "../../../components/layout";
import {
  FaBoxes,
} from "react-icons/fa";
export default function Units() {
  const [open, setOpen] = React.useState(false);

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <MainContainer>
      <CommonToolbar
        title="Units"
        icon={<FaBoxes/>}
        onAddProps={{ title: "Add Unit", onClick: onAdd }}
      />
      <Box sx={{ mt: 3 }}>
        <UnitList searchText="" addClose={onClose} addOpen={open} />
      </Box>
    </MainContainer>
  );
}
