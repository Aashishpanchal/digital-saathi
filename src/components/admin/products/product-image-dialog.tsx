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
  imageId?: string;
  reload: () => void;
  skuId: string;
}) {
  const { open, close, imageId, reload, skuId } = props;
  const [file, setFile] = React.useState<File>();
  const [data, setData] = React.useState<{ [key: string]: any }>({});
  const [loading, setLoading] = React.useState(false);
  const { S3UpdateImage, S3ImageUploader } = useBucket("product-images");
  const { enqueueSnackbar } = useSnackbar();

  const onUpload = async () => {
    if (imageId) {
      try {
        setLoading(true);
        const metadata: any = await S3UpdateImage(data.image, file);
        if (metadata) {
          // upload data in server
          const res = await shopProductImages("put", {
            params: imageId,
            data: JSON.stringify({
              sku_id: skuId,
              title: data.title,
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
              sku_id: skuId,
              title: data.title,
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

  const onRetrieve = async () => {
    try {
      const res = await shopProductImages("get", {
        params: imageId,
      });
      if (res?.status === 200) {
        setFile(res.data.image);
        setData(res.data);
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    onRetrieve();
  }, []);

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
