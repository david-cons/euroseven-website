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
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PaidIcon from "@mui/icons-material/Paid";
import { useNavigate } from "react-router-dom";

export const Sidebar = (props: {
  handleTabChange(tab: string): void;
  selectedTab: String;
}) => {
  const navigate = useNavigate();

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
              Titi
            </Typography>
            <Typography
              color="#9da4ae"
              sx={{
                fontFamily: "Catesque",
                letterSpacing: "2px",
              }}
            >
              Administrator
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
                  color:
                    props.selectedTab === "clienti" ? "#509be4" : "#FFFFFF",
                  mt: "10px",
                }}
              >
                <ListItemButton
                  onClick={() => props.handleTabChange("clienti")}
                >
                  <ListItemIcon>
                    <PeopleAltIcon
                      sx={{
                        color:
                          props.selectedTab === "clienti"
                            ? "#509be4"
                            : "#FFFFFF",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Clienti"
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
                    props.selectedTab === "anunturi" ? "#509be4" : "#FFFFFF",
                  mt: "10px",
                }}
              >
                <ListItemButton
                  onClick={() => props.handleTabChange("anunturi")}
                >
                  <ListItemIcon>
                    <EmailIcon
                      sx={{
                        color:
                          props.selectedTab === "anunturi"
                            ? "#509be4"
                            : "#FFFFFF",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Anunțuri"
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
                    props.selectedTab === "statistici" ? "#509be4" : "#FFFFFF",
                  mt: "10px",
                }}
              >
                <ListItemButton
                  onClick={() => props.handleTabChange("statistici")}
                >
                  <ListItemIcon>
                    <BarChartIcon
                      sx={{
                        color:
                          props.selectedTab === "statistici"
                            ? "#509be4"
                            : "#FFFFFF",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Statistici"
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
        onClick={() => navigate("/login")}
      >
        Deconectare
      </Button>
    </Box>
  );
};
