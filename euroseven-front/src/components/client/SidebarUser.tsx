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
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PaidIcon from "@mui/icons-material/Paid";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import SpeedIcon from "@mui/icons-material/Speed";
import HelpIcon from "@mui/icons-material/Help";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

export const SidebarUser = (props: {
  handleTabChange(tab: string): void;
  selectedTab: String;
  name: string;
  codClient: number;
}) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const logOut = () => {
    dispatch(logout()).then(() => {
      navigate("/login");
    });
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
        <Box
          sx={{
            marginTop: "10px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/")}
        >
          <img src={logo2} alt="logo" />
        </Box>
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
                sx={{ fontFamily: "Catesque", letterSpacing: "2px", ml: "5px" }}
              >
                {props.codClient}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: "1vh", height: "100%", position: "relative" }}>
            <List>
              <ListItem
                disablePadding
                sx={{
                  color: "#FFFFFF",
                  mb: "5vh",
                }}
              >
                <ListItemButton
                  onClick={() => navigate("/")}
                  sx={{
                    background: "#252e3e",
                    borderRadius: "10px",
                  }}
                >
                  <ListItemText
                    primary="Pagină Principală"
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
                  color:
                    props.selectedTab === "facturi" ? "#509be4" : "#FFFFFF",
                  mt: "10px",
                }}
              >
                <ListItemButton
                  onClick={() => props.handleTabChange("facturi")}
                >
                  <ListItemIcon>
                    <PaidIcon
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
                  color:
                    props.selectedTab === "contract" ? "#509be4" : "#FFFFFF",
                  mt: "10px",
                }}
              >
                <ListItemButton
                  onClick={() => props.handleTabChange("contract")}
                >
                  <ListItemIcon>
                    <ContactPageIcon
                      sx={{
                        color:
                          props.selectedTab === "contract"
                            ? "#509be4"
                            : "#FFFFFF",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Contract"
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
                    primary="Citire Contor"
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
                  color: props.selectedTab === "consum" ? "#509be4" : "#FFFFFF",
                  mt: "10px",
                }}
              >
                <ListItemButton onClick={() => props.handleTabChange("consum")}>
                  <ListItemIcon>
                    <SpeedIcon
                      sx={{
                        color:
                          props.selectedTab === "consum"
                            ? "#509be4"
                            : "#FFFFFF",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Consum"
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
                  color: props.selectedTab === "ajutor" ? "#509be4" : "#FFFFFF",
                  mt: "10px",
                }}
              >
                <ListItemButton onClick={() => props.handleTabChange("ajutor")}>
                  <ListItemIcon>
                    <HelpIcon
                      sx={{
                        color:
                          props.selectedTab === "ajutor"
                            ? "#509be4"
                            : "#FFFFFF",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ajutor"
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
