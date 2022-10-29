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
import { shopProductImages } from "../../../http";
import { TextInput } from "../../form";
import FileUploader from "../../form/inputs/file-uploader";
import ImageView from "../../Image/image-view";

export default function ProductImageDialog(props: {
  open: boolean;
  close: () => void;
  productImageData: Record<string, any> | null;
  reload: () => void;
  skuId: string;
}) {
  const { open, close, productImageData, reload, skuId } = props;
  const [file, setFile] = React.useState<File>(productImageData?.image);
  const [data, setData] = React.useState<{ [key: string]: any }>({
    title: productImageData?.title || "",
    image: productImageData?.image || "",
  });
  const [loading, setLoading] = React.useState(false);
  const { S3UpdateImage, S3ImageUploader } = useBucket("product-images");
  const { enqueueSnackbar } = useSnackbar();

  const onUpload = async () => {
    if (productImageData) {
      try {
        setLoading(true);
        const metadata: any = await S3UpdateImage(data.image, file);
        if (metadata) {
          // upload data in server
          const res = await shopProductImages("put", {
            params: productImageData?.image_id,
            data: JSON.stringify({
              ...data,
              sku_id: skuId,
              image: metadata.Location,
            }),
          });
          // uploading finish return true
          if (res?.status === 200) {
            close();
            setTimeout(
              () =>
                enqueueSnackbar("Product Image Update  successfully!👍😊", {
                  variant: "success",
                }),
              200
            );
            reload();
          }
        }
      } catch (error) {
        enqueueSnackbar("Product Image Update Failed!😢", {
          variant: "error",
        });
      }
    } else {
      try {
        setLoading(true);
        const metadata: any = await S3ImageUploader(file as File);
        if (metadata) {
          // upload data in server
          const res = await shopProductImages("post", {
            data: JSON.stringify({
              ...data,
              sku_id: skuId,
              image: metadata.Location,
            }),
          });
          // uploading finish return true
          if (res?.status === 200) {
            close();
            setTimeout(
              () =>
                enqueueSnackbar("Product Image Add  successfully!👍😊", {
                  variant: "success",
                }),
              200
            );
            reload();
          }
        }
      } catch (error) {
        enqueueSnackbar("Product Image Add Failed!😢", {
          variant: "error",
        });
      }
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Product Image</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 1 }}>
          <TextInput
            label="Title"
            value={data.title}
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
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
            Save
          </Button>
          <Button color="secondary" variant="outlined" onClick={close}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
