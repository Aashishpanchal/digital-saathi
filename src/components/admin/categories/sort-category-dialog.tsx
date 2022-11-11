import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DnDList from "../../drag-drop-list/dnd-list";
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

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;
    console.log(destination.index, source.index);
    const newItems = reorder(options, source.index, destination.index);
    setOptions(newItems);
  };

  React.useEffect(() => {
    onGetRequest();
  }, []);

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Sort</DialogTitle>
      <DialogContent>
        <DnDList
          options={options}
          extractObj={{
            id: "category_id",
            title: "name",
          }}
          onDragEnd={onDragEnd}
        />
      </DialogContent>
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
