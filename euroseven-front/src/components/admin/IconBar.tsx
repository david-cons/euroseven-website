import { Box, IconButton, Avatar } from "@mui/material"
import Search from "@mui/icons-material/Search";
import { StyledAvatar } from "../StyledAvatar"
import { MaterialUISwitch } from "./MaterialUISwitch"
import { StyledBadge } from "./StyledBadge"
import NotificationsIcon from "@mui/icons-material/Notifications";

export const IconBar: React.FC<{image: string | undefined}> = (image) => {

    return (
        <Box>
          <Search
            sx={{ position: "absolute", top: 0, left: 0, padding: "20px" }}
          />

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
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </StyledBadge>
            </IconButton>

            <IconButton></IconButton>
            <StyledAvatar
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              color="success"
              sx={{ mr: "10px" }}
            >
              <Avatar
                alt="photo"
                src={image ? `data:image/jpeg;base64,${image}` : "ADMIN"}
              />
            </StyledAvatar>
          </Box>
        </Box>
    )
}