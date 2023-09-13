import { Box } from "@mui/material";
import { Sidebar } from "../../components/admin/Sidebar";
import { useState } from "react";
import { AdminHome } from "./AdminHome";
import { AdminUsers } from "./AdminUsers";
import { AdminNews } from "./AdminNews";

export const AdminHomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<String>("acasa");

  const handleTabClick = (tab: String) => {
    setSelectedTab(tab);
  };

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
        }}
      >
        {selectedTab === "acasa" && <AdminHome />}
        {selectedTab === "clienti" && <AdminUsers />}
        {selectedTab === "anunturi" && <AdminNews />}
        {selectedTab === "facturi" && <h1>Facturi</h1>}
        {selectedTab === "statistici" && <h1>Statistici</h1>}
        {selectedTab === "setari" && <h1>Setari</h1>}
      </Box>
    </Box>
  );
};
