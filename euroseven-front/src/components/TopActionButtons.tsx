import {
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  MenuList,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { StyledAvatar } from "./StyledAvatar";
import { MaterialUISwitch } from "./admin/MaterialUISwitch";
import { StyledBadge } from "./admin/StyledBadge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NotificationEntity } from "../types";
import { useEffect, useState } from "react";
import { NotificationService } from "../services/NotificationService";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

export const TopActionButtons: React.FC<{
  photo: string | undefined;
  codClient: number | undefined;
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
  notifications: NotificationEntity[];
  setNotifications?: React.Dispatch<React.SetStateAction<NotificationEntity[]>>;
}> = ({
  photo,
  codClient,
  setSelectedTab,
  notifications,
  setNotifications,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("hey");
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        padding: "20px",
        display: "flex",
      }}
    >
      <MaterialUISwitch defaultChecked={false} sx={{ mt: "3px" }} />
      <IconButton aria-label="cart" onClick={handleClick} sx={{mr: "3px"}}>
        <StyledBadge badgeContent={notifications.length} color="secondary">
          <NotificationsIcon />
        </StyledBadge>
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList sx={{ width: "400px" }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <MenuItem
                sx={{ border: "1px solid #f2f2f2" }}
                key={notification.id}
                onClick={() => {
                  setSelectedTab("setari");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <DoubleArrowIcon fontSize="small" sx={{ color: "#0054a6" }} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "Catesque",
                    },
                  }}
                >
                  {notification.content}
                </ListItemText>
              </MenuItem>
            ))
          ) : (
            <MenuItem onClick={() => handleClose()}>
              <ListItemText
                sx={{
                  "& .MuiTypography-root": {
                    fontFamily: "Catesque",
                  },
                }}
              >
                Nu exista notificari
              </ListItemText>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <StyledAvatar
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        color="success"
        sx={{ mr: "10px" }}
      >
        <Avatar alt="photo" src={`data:image/jpeg;base64,${photo}`} />
      </StyledAvatar>
    </Box>
  );
};
