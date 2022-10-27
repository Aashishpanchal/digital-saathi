import React from "react";
import Box from "@mui/material/Box";
import { MainContainer } from "../../../components/layout";
import CommonToolbar from "../../../components/admin/common-toolbar";
import AreaList from "../../../components/admin/master/area-list";

export default function Units() {
  const [open, setOpen] = React.useState(false);

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <MainContainer>
      <CommonToolbar
        title="Areas"
        onAddProps={{ title: "Add Area", onClick: onAdd }}
      />
      <Box sx={{ mt: 3 }}>
        <AreaList searchText="" addClose={onClose} addOpen={open} />
      </Box>
    </MainContainer>
  );
}
