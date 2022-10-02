import { useState, useRef } from "react";
import styled from "@emotion/styled";
import { AppBar, Toolbar, IconButton, Avatar, Box } from "@mui/material";
import { AiOutlineMenuFold } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import AccountPopover from "./account-popover";

const DashboardNavbarRoot = styled(AppBar)`
  background: rgba(244, 247, 254, 0.2) center center / cover;
  filter: none;
  backdrop-filter: blur(20px);
  border-style: solid;
  border-color: #e6e8f0;
  border-width: 0px 0px thin;
`;

const MenuIcons = styled(AiOutlineMenuFold)`
  font-size: 1.25rem;
`;

const UserCircleIcon = styled(FaUserCircle)`
  font-size: 2.25rem;
`;

export default function DashboardNavbar(props: { onSidebarOpen: () => void }) {
  const { onSidebarOpen } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
          boxShadow: "none",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcons />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
              ml: 1,
            }}
            src="https://picsum.photos/200/300"
          >
            <UserCircleIcon />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
}
