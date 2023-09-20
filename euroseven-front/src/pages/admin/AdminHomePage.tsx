import { Avatar, Box, IconButton } from "@mui/material";
import { MaterialUISwitch } from "../../components/admin/MaterialUISwitch";
import { StyledBadge } from "../../components/admin/StyledBadge";
import { Sidebar } from "../../components/admin/Sidebar";
import { useEffect, useState } from "react";
import Search from "@mui/icons-material/Search";
import { StyledAvatar } from "../../components/StyledAvatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AdminHome,
  AdminUsers,
  AdminNews,
  AdminInvoices,
  AdminSetari,
} from "./";
import { UserService } from "../../services/UserService";
import { UserEntity } from "../../types";
import { useSelector } from "react-redux";

export const AdminHomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<String>(
    localStorage.getItem("selectedTab") !== null
      ? localStorage.getItem("selectedTab")!
      : "acasa"
  );
  const [admin, setAdmin] = useState<UserEntity | null>(null);

  const adminId = useSelector((state: any) => state.authentication.userId);

  const handleTabClick = (tab: String) => {
    setSelectedTab(tab);
    localStorage.setItem("selectedTab", tab.toString());
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      await UserService.getUserById(adminId)
        .then((res) => {
          setAdmin(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchAdmin();
  }, [adminId]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sidebar handleTabChange={handleTabClick} selectedTab={selectedTab} />
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
                src={`data:image/jpeg;base64,${admin?.image}`}
              />
            </StyledAvatar>
          </Box>
        </Box>
        {selectedTab === "acasa" && <AdminHome />}
        {selectedTab === "clienti" && <AdminUsers />}
        {selectedTab === "anunturi" && <AdminNews />}
        {selectedTab === "facturi" && <AdminInvoices />}
        {selectedTab === "statistici" && <h1>Statistici</h1>}
        {selectedTab === "setari" && (
          <AdminSetari admin={admin} setAdmin={setAdmin} />
        )}
      </Box>
    </Box>
  );
};
