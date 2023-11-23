import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { StyledAvatar } from "../StyledAvatar";
import logo2 from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";

const pages = [
  {
    name: "Acasă",
    value: "acasa",
  },
  {
    name: "Facturi",
    value: "facturi",
  },
  {
    name: "Contract",
    value: "contract",
  },
  {
    name: "Contor",
    value: "contor",
  },
  {
    name: "Consum",
    value: "consum",
  },
  {
    name: "Ajutor",
    value: "ajutor",
  },
  {
    name: "Setări",
    value: "setari",
  },
];

export const ResponsiveAppBar: React.FC<{
  handleTabChange(tab: string): void;
  selectedTab: String;
  photo: string | undefined;
}> = ({ handleTabChange, selectedTab, photo }) => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const changeTabAndClose = (tab: string) => {
    handleTabChange(tab);
    handleCloseNavMenu();
  };

  return (
    <AppBar
      sx={{
        "@media (min-width: 800px)": {
          display: "none",
        },
        mb: "25px",
        background: "#1c2536",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: "15px" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                  "& .MuiMenu-paper": {
                    background: "#1c2536",
                  },
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.value}
                  onClick={() => changeTabAndClose(page.value)}
                  sx={{ background: "#1c2536" }}
                >
                  <Typography
                    textAlign="center"
                    color={selectedTab === page.value ? "#509be4" : "#FFFFFF"}
                    fontFamily={"Catesque"}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <Box
              sx={{
                borderRadius: "10px",
                height: "75px",
                width: "100px",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  alignItems: "left",
                  padding: "15px",
                }}
              >
                <Typography
                  color="#ffffff"
                  sx={{
                    fontFamily: "Catesque",
                    letterSpacing: "2px",
                  }}
                >
                  Titi
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    color="#9da4ae"
                    sx={{
                      fontFamily: "Catesque",
                      letterSpacing: "2px",
                    }}
                  >
                    Client
                  </Typography>
                  <Typography
                    color="#509be4"
                    sx={{
                      fontFamily: "Catesque",
                      letterSpacing: "2px",
                      ml: "5px",
                    }}
                  >
                    232345
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            component={"img"}
            src={logo2}
            alt={"logo"}
            height={"75px"}
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
          <Box sx={{ flexGrow: 0 }}>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
