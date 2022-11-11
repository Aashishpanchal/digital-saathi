import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { categories } from "../../../http";
import { DropResult } from "react-beautiful-dnd";
import { reorder } from "../utils";

export default function SortCategoryDialog(props: {
  open: boolean;
  onSave?: () => void;
  onClose?: () => void;
}) {
  const { onClose, onSave, open } = props;

  const [options, setOptions] = React.useState([]);

  const onGetRequest = async () => {
    try {
      const res = await categories("get");
      if (res?.status === 200) setOptions(res.data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    onGetRequest();
  }, []);

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Sort</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
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
          <Button color="secondary" variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
