import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { FaLock } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const PasswordLock = styled(FaLock)`
  font-size: 1.25rem;
`;

const Logout = styled(FiLogOut)`
  font-size: 1.25rem;
`;

export default function AccountPopover(props: {
  anchorEl: any;
  onClose: () => void;
  open: boolean;
}) {
  const { anchorEl, onClose, open } = props;
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "200px" },
      }}
    >
      <Box
        sx={{
          py: 1,
          px: 2,
        }}
      >
        <Typography variant="overline" fontSize={"small"}>
          Account
        </Typography>
        <Typography color="text.secondary" variant="body2" fontSize={"small"}>
          John Doe
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={() => console.log("singout")}>
          <ListItemIcon>
            <PasswordLock />
          </ListItemIcon>
          <ListItemText>Change Password</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => console.log("singout")}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>logout</ListItemText>
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
