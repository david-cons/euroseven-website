import { useEffect, useState } from "react";
import { UserEntity } from "../../types";
import { useSelector } from "react-redux";
import { UserService } from "../../services/UserService";
import { Avatar, Box, IconButton } from "@mui/material";
import { SidebarIncasari } from "../../components/incasari/SidebarIncasari";
import { StyledAvatar } from "../../components/StyledAvatar";
import { MaterialUISwitch } from "../../components/admin/MaterialUISwitch";
import { StyledBadge } from "../../components/admin/StyledBadge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Search from "@mui/icons-material/Search";
import { SetariPage } from "../SetariPage";
import { IncasariHome } from "./IncasariHome";
import "./IncasariHomePage.css";
import { IncasariInvoices } from "./IncasariInvoices";
import { IncasariPlati } from "./IncasariPlati";

export const IncasariHomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<String>(
    localStorage.getItem("selectedTab") !== null
      ? localStorage.getItem("selectedTab")!
      : "acasa"
  );

  const [incasari, setInacasari] = useState<UserEntity | null>(null);

  const incasariId = useSelector((state: any) => state.authentication.userId);

  const handleTabClick = (tab: String) => {
    setSelectedTab(tab);
    localStorage.setItem("selectedTab", tab.toString());
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      await UserService.getUserById(incasariId)
        .then((res) => {
          setInacasari(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchAdmin();
  }, [incasariId]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "hidden",
      }}
    >
      <SidebarIncasari
        handleTabChange={handleTabClick}
        selectedTab={selectedTab}
      />
      <Box
        sx={{
          flex: "0 0 85%",
          height: "100vh",
          position: "relative",
          width: "85vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          backgroundColor: "#f8f9fe",
        }}
      >
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
                src={`data:image/jpeg;base64,${incasari?.image}`}
              />
            </StyledAvatar>
          </Box>
        </Box>
        {selectedTab === "acasa" && (
          <IncasariHome setSelectedTab={setSelectedTab} />
        )}
        {selectedTab === "plati" && <IncasariPlati />}
        {selectedTab === "facturi" && <IncasariInvoices />}
        {selectedTab === "setari" && (
          <SetariPage user={incasari} setUser={setInacasari} />
        )}
      </Box>
    </Box>
  );
};
