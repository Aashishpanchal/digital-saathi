import React from "react";
import ProductAvatar from "./product-avatar";
import { shopImgDownLoad } from "../../http";
import { AvatarProps } from "@mui/material/Avatar";

type Modify<T, R> = Omit<T, keyof R> & R;

interface PropsI
  extends Modify<
    AvatarProps,
    {
      src?: string | File;
    }
  > {
  download?: boolean;
}

function ShopAvatar(props: PropsI) {
  const { src, download, ...otherProps } = props;
  const [imgStr, setImgStr] = React.useState("");

  const onDownload = async () => {
    try {
      const res = await shopImgDownLoad(src);
      if (res.status === 200) setImgStr(URL.createObjectURL(res.data));
    } catch (error) {
      // console.log(error);
    }
  };

  React.useEffect(() => {
    if (download && typeof src === "string") onDownload();
    else {
      if (typeof src === "string") setImgStr(src);
      else if (src instanceof File) {
        const reader = new FileReader();
        reader.readAsDataURL(src);
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setImgStr(reader.result);
          }
        };
      }
    }
  }, [src, download]);

  return <ProductAvatar {...otherProps} src={imgStr} />;
}

export default React.memo(ShopAvatar);
