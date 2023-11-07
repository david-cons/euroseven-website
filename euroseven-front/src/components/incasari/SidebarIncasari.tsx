import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import logo2 from "../../assets/logo2.png";
import WindowIcon from "@mui/icons-material/Window";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PaidIcon from "@mui/icons-material/Paid";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";
import GasMeterIcon from "@mui/icons-material/GasMeter";

export const SidebarIncasari = (props: {
  handleTabChange(tab: string): void;
  selectedTab: String;
  name: string;
}) => {
  const navigate = useNavigate();

  const logOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        flex: "0 0 15%",
        height: "100vh",
        width: "15vh",
        backgroundColor: "#1c2536",
        position: "relative",
      }}
    >
      <Box sx={{ alignItems: "center", justifyContent: "center" }}>
        <img src={logo2} alt="logo" style={{ marginTop: "10px" }} />
        <Box
          sx={{
            borderRadius: "10px",
            height: "8vh",
            width: "25vh",
            backgroundColor: "#252e3e",
            margin: "0 auto",
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
              {props.name}
            </Typography>
            <Typography
              color="#9da4ae"
              sx={{
                fontFamily: "Catesque",
                letterSpacing: "2px",
              }}
            >
              Incasari
            </Typography>
          </Box>
          <Box sx={{ mt: "5vh", height: "100%", position: "relative" }}>
            <List>
              <ListItem
                disablePadding
                sx={{
                  color: props.selectedTab === "acasa" ? "#509be4" : "#FFFFFF",
                }}
              >
                <ListItemButton onClick={() => props.handleTabChange("acasa")}>
                  <ListItemIcon>
                    <WindowIcon
                      sx={{
                        color:
                          props.selectedTab === "acasa" ? "#509be4" : "#FFFFFF",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Acasă"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontFamily: "Catesque",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{
                  color: props.selectedTab === "plati" ? "#509be4" : "#FFFFFF",
                  mt: "10px",
                }}
              >
                <ListItemButton onClick={() => props.handleTabChange("plati")}>
                  <ListItemIcon>
                    <PaidIcon
                      sx={{
                        color:
                          props.selectedTab === "plati" ? "#509be4" : "#FFFFFF",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Plati"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontFamily: "Catesque",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{
                  color:
                    props.selectedTab === "facturi" ? "#509be4" : "#FFFFFF",
                  mt: "10px",
                }}
              >
                <ListItemButton
                  onClick={() => props.handleTabChange("facturi")}
                >
                  <ListItemIcon>
                    <EmailIcon
                      sx={{
                        color:
                          props.selectedTab === "facturi"
                            ? "#509be4"
                            : "#FFFFFF",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Facturi"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontFamily: "Catesque",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{
                  color: props.selectedTab === "contor" ? "#509be4" : "#FFFFFF",
                  mt: "10px",
                }}
              >
                <ListItemButton onClick={() => props.handleTabChange("contor")}>
                  <ListItemIcon>
                    <GasMeterIcon
                      sx={{
                        color:
                          props.selectedTab === "contor"
                            ? "#509be4"
                            : "#FFFFFF",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Contoare"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontFamily: "Catesque",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{
                  color: props.selectedTab === "setari" ? "#509be4" : "#FFFFFF",
                  mt: "10px",
                }}
              >
                <ListItemButton onClick={() => props.handleTabChange("setari")}>
                  <ListItemIcon>
                    <SettingsIcon
                      sx={{
                        color:
                          props.selectedTab === "setari"
                            ? "#509be4"
                            : "#FFFFFF",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Setări"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontFamily: "Catesque",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
      <Button
        sx={{
          color: "#ffffff",
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          fontFamily: "Catesque",
        }}
        startIcon={<ExitToAppIcon />}
        onClick={logOut}
      >
        Deconectare
      </Button>
    </Box>
  );
};
