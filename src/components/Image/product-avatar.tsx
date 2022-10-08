import { Avatar as MaterialAvatar, AvatarProps } from "@mui/material";

export default function ProductAvatar(props: AvatarProps) {
  return (
    <MaterialAvatar {...props}>
      <MaterialAvatar {...props} src="/images/default-image.png" />
    </MaterialAvatar>
  );
}
