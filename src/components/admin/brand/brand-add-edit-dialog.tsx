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
import { brands } from "../../../http";
import { TextInput } from "../../form";
import FileUploader from "../../form/inputs/file-uploader";
import ImageView from "../../Image/image-view";

export default function BrandAddEditDialog(props: {
  open: boolean;
  close: () => void;
  reload: Function;
  brand: { [key: string]: any } | null;
  variant: "edit" | "add";
}) {
  const { open, close, brand, reload, variant } = props;
  const [file, setFile] = React.useState<File>(brand?.brand_image);
  const [data, setData] = React.useState({
    brand_name: brand?.brand_name || "",
    description: brand?.description || "",
    brand_image: brand?.brand_image || "",
  });
  const [loading, setLoading] = React.useState(false);
  const { S3UpdateImage, S3ImageUploader } = useBucket("brand-images");
  const { enqueueSnackbar } = useSnackbar();

  const onUpload = async () => {
    if (file) {
      if (brand) {
        try {
          setLoading(true);
          const metadata: any = await S3UpdateImage(data.brand_image, file);
          if (metadata) {
            // upload data in server
            const res = await brands("put", {
              params: brand?.brand_id,
              data: JSON.stringify({
                ...data,
                brand_image: metadata.Location,
              }),
            });
            // uploading finish return true
            if (res?.status === 200) {
              close();
              setTimeout(
                () =>
                  enqueueSnackbar("Brand Update  successfully!👍😊", {
                    variant: "success",
                  }),
                200
              );
              reload();
            }
          }
        } catch (error) {
          enqueueSnackbar("Brand Update Failed!😢", {
            variant: "error",
          });
        }
      } else {
        try {
          setLoading(true);
          const metadata: any = await S3ImageUploader(file as File);
          if (metadata) {
            // upload data in server
            const res = await brands("post", {
              data: JSON.stringify({
                ...data,
                brand_image: metadata.Location,
              }),
            });
            // uploading finish return true
            if (res?.status === 200) {
              close();
              setTimeout(
                () =>
                  enqueueSnackbar("Brand Add  successfully!👍😊", {
                    variant: "success",
                  }),
                200
              );
              reload();
            }
          }
        } catch (error) {
          enqueueSnackbar("Brand Add Failed!😢", {
            variant: "error",
          });
        }
      }
      setLoading(false);
    } else {
      enqueueSnackbar("Brand Image Missing😢", {
        variant: "error",
      });
    }
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Brand</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 1 }}>
          <TextInput
            type="text"
            label="Brand Name"
            name="brand_name"
            value={data.brand_name}
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
          <ImageView src={file ? file : data?.brand_image} />
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
