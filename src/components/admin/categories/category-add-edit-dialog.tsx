import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { emptyText } from "../../../constants/messages";
import { api2 } from "../../../http";
import { TextInput } from "../../form";
import FileUploader from "../../form/inputs/file-uploader";
import ImageView from "../../Image/image-view";
import { objectToForm } from "../utils";

export default function CategoryAddEditDialog(props: {
  open: boolean;
  close: () => void;
  reload: () => Promise<any>;
  category?: { [key: string]: any };
  variant: "edit" | "add";
  type: "category" | "subcategory";
  otherData?: Record<string, any>;
}) {
  const { open, close, category, reload, variant, type, otherData } = props;
  const [file, setFile] = React.useState<File>(category?.image);
  const [data, setData] = React.useState({
    name: category?.name || "",
    description: category?.description || "",
    image: category?.image || "",
  });
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const cateLabel = React.useMemo(
    () => (type === "category" ? "Category" : "SubCategory"),
    []
  );

  const putRequest = async (categoryData: FormData) => {
    categoryData.append("id", category?.category_id);
    try {
      const res = await api2.post("shop_upload".concat(type), categoryData);
      if (res.status === 200) {
        close();
        setTimeout(
          () =>
            enqueueSnackbar(type + " update successfully!👍😊", {
              variant: "success",
            }),
          200
        );
        reload();
      }
    } catch (error: any) {
      console.log(error);
      setTimeout(
        () =>
          enqueueSnackbar(type + " update failed!😢", {
            variant: "error",
          }),
        200
      );
    }
  };

  const postRequest = async (categoryData: FormData) => {
    try {
      const res = await api2.post("shop_upload".concat(type), categoryData);
      if (res.status === 200) {
        close();
        setTimeout(
          () =>
            enqueueSnackbar(type + " add successfully!👍😊", {
              variant: "success",
            }),
          200
        );
        reload();
      }
    } catch (error) {
      console.log(error);
      setTimeout(
        () =>
          enqueueSnackbar(type + " add failed!😢", {
            variant: "error",
          }),
        200
      );
    }
  };

  const onUpload = async () => {
    setLoading(true);
    if (file) {
      const { image, ...others } = data;
      const formData = objectToForm({ ...others, ...otherData });
      if (file !== data.image) formData.append("image", file);
      console.log(formData.get("image"));
      await (variant === "edit" ? putRequest : postRequest)(formData);
    } else {
      enqueueSnackbar(emptyText(type + " image"), {
        variant: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>{cateLabel}</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 1 }}>
          <TextInput
            type="text"
            label={cateLabel.concat(" Name")}
            name="name"
            placeholder="category name"
            value={data.name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
          />
          <TextInput
            type="text"
            label="Description"
            name="description"
            placeholder="description"
            value={data.description}
            onChange={(e) =>
              setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            multiline
            rows={4}
          />
          <ImageView src={file ? file : data?.image} />
        </Box>
        <FileUploader handleChange={(file) => setFile(file)} />
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
            onClick={onUpload}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : undefined
            }
          >
            {variant === "add" ? "Save" : "Update"}
          </Button>
          <Button color="secondary" variant="outlined" onClick={close}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
