import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
} from "@mui/material";
import { MaterialUISwitch } from "../../components/admin/MaterialUISwitch";
import { StyledBadge } from "../../components/admin/StyledBadge";
import { Sidebar } from "../../components/admin/Sidebar";
import { useEffect, useState } from "react";
import Search from "@mui/icons-material/Search";
import { StyledAvatar } from "../../components/StyledAvatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AdminHome, AdminUsers, AdminNews } from "./";
import { UserService } from "../../services/UserService";
import { UserEntity } from "../../types";
import { useSelector } from "react-redux";
import { SetariPage } from "../SetariPage";
import { pagesAdmin } from "../../lunrjs/dataAdmin";
import { IncasariInvoices } from "../incasari/IncasariInvoices";
import { AdminIFactura } from "./AdminIFactura";
import { AdminConsum } from "./AdminConsum";

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

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof pagesAdmin>([]);

  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = () => {
    if (query !== "" && query !== " ") {
      const matchedPages = pagesAdmin.filter((page) =>
        page.content.toLowerCase().includes(query.toLowerCase())
      );

      setResults(matchedPages);
    } else {
      setResults([]);
    }
  };

  const handleClickSearch = () => {
    setOpenSearch(!openSearch);
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
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "hidden",
      }}
    >
      <Sidebar handleTabChange={handleTabClick} selectedTab={selectedTab} />
      <Box
        sx={{
          height: "911px",
          position: "relative",
          width: `calc(100% - 260px)`,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          backgroundColor: "#f8f9fe",
          overflowY: "hidden",
          "@media (max-width: 800px)": {
            width: "100%",
            flex: "0 0 100%",
          },
        }}
      >
        <Box>
          <Search
            onClick={handleClickSearch}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              padding: "20px",
              ":hover": {
                cursor: "pointer",
              },
              color: "#0054a6",
            }}
          />
          {openSearch && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "3%",
                paddingTop: "13px",
              }}
            >
              <TextField
                type="text"
                value={query}
                size="small"
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleSearch();
                }}
                placeholder="Caută..."
                sx={{
                  "& .MuiInputBase-input": {
                    color: "black", // Text color
                    fontFamily: "Catesque", // Font family
                  },
                  "& input:disabled": {
                    color: "black", // Text color
                    fontFamily: "Catesque", // Font family
                    WebkitTextFillColor: "black",
                  },
                  "& .MuiInputLabel-root": {
                    color: "black", // Label color
                    fontFamily: "Catesque", // Font family
                    fontSize: "18px",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#0054a6", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#0054a6", // Hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0054a6", // Focused border color
                    },
                  },
                }}
              />

              <List
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  position: "absolute",
                  top: 0,
                  left: "100%",
                  paddingTop: "5px",
                }}
              >
                {query &&
                  results.length > 0 &&
                  results.map((page) => (
                    <ListItem>
                      <ListItemButton
                        key={page.id}
                        onClick={() => {
                          handleTabClick(page.selectedTab);
                          handleClickSearch();
                        }}
                        sx={{ color: "#0054a6", fontFamily: "Catesque" }}
                      >
                        <ListItemIcon sx={{ color: "#0054a6" }}>
                          {page.icon()}
                        </ListItemIcon>
                        {page.displayName}
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            </Box>
          )}

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
        {selectedTab === "facturi" && <IncasariInvoices />}
        {selectedTab === "statistici" && <h1>Statistici</h1>}
        {selectedTab === "ifactura" && <AdminIFactura />}
        {selectedTab === "setari" && (
          <SetariPage user={admin} setUser={setAdmin} />
        )}
        {selectedTab === "consum" && <AdminConsum />}
      </Box>
    </Box>
  );
};
