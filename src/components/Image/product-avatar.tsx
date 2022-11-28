import { Avatar as MaterialAvatar, AvatarProps } from "@mui/material";

export interface ProductAvatarPropsI extends AvatarProps {
  imgRectangle?: boolean;
}

export default function ProductAvatar(props: ProductAvatarPropsI) {
  const { imgRectangle, ...other } = props;
  return (
    <MaterialAvatar
      {...other}
      sx={{
        ...other.sx,
        backgroundColor: imgRectangle ? "#fff" : "",
        border: imgRectangle ? "1px solid green" : "",
      }}
    >
      {imgRectangle ? (
        <MaterialAvatar
          variant="rounded"
          src="/images/default-image.jpg"
          sx={{
            width: 100,
            height: 100,
          }}
        />
      ) : (
        <MaterialAvatar {...props} src="/images/default-image.jpg" />
      )}
    </MaterialAvatar>
  );
}
