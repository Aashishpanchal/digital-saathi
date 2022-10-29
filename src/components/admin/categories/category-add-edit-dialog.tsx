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
import useBucket from "../../../hooks/useBucket";
import { categories, subCategories } from "../../../http";
import { TextInput } from "../../form";
import FileUploader from "../../form/inputs/file-uploader";
import ImageView from "../../Image/image-view";

export default function CategoryAddEditDialog(props: {
  open: boolean;
  close: () => void;
  reload: () => Promise<any>;
  category: { [key: string]: any } | null;
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
  const { S3UpdateImage, S3ImageUploader } = useBucket(
    type === "category" ? "category-images" : "sub-category-images"
  );
  const { enqueueSnackbar } = useSnackbar();

  const cateLabel = React.useMemo(
    () => (type === "category" ? "Category" : "SubCategory"),
    []
  );

  const onUpload = async () => {
    if (file) {
      if (category) {
        try {
          setLoading(true);
          const metadata: any = await S3UpdateImage(data.image, file);
          if (metadata) {
            // upload data in server
            const res = await (type === "category"
              ? categories
              : subCategories)("put", {
              params: category?.category_id,
              data: JSON.stringify({
                ...data,
                ...otherData,
                image: metadata.Location,
              }),
            });
            // uploading finish return true
            if (res?.status === 200) {
              close();
              setTimeout(
                () =>
                  enqueueSnackbar(
                    cateLabel.concat(" Update  successfully!👍😊"),
                    {
                      variant: "success",
                    }
                  ),
                200
              );
              reload();
            }
          }
        } catch (error) {
          enqueueSnackbar(cateLabel.concat(" Update Failed!😢"), {
            variant: "error",
          });
        }
      } else {
        try {
          setLoading(true);
          const metadata: any = await S3ImageUploader(file as File);
          if (metadata) {
            // upload data in server
            const res = await (type === "category"
              ? categories
              : subCategories)("post", {
              data: JSON.stringify({
                ...data,
                ...otherData,
                image: metadata.Location,
              }),
            });
            // uploading finish return true
            if (res?.status === 200) {
              close();
              setTimeout(
                () =>
                  enqueueSnackbar(cateLabel.concat(" Add  successfully!👍😊"), {
                    variant: "success",
                  }),
                200
              );
              reload();
            }
          }
        } catch (error) {
          enqueueSnackbar(cateLabel.concat(" Add Failed!😢"), {
            variant: "error",
          });
        }
      }
      setLoading(false);
    } else {
      enqueueSnackbar(cateLabel.concat(" Image Missing😢"), {
        variant: "error",
      });
    }
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
            value={data.name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
          />
          <TextInput
            type="text"
            label="Description"
            name="description"
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
