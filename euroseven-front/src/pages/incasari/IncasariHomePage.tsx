import { useEffect, useState } from "react";
import { NotificationEntity, UserEntity } from "../../types";
import { useSelector } from "react-redux";
import { UserService } from "../../services/UserService";
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
import { IncasariContor } from "./IncasariContor";
import { TopActionButtons } from "../../components/TopActionButtons";
import { pagesIncasari } from "../../lunrjs/dataAdmin";

export const IncasariHomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<String>(
    localStorage.getItem("selectedTab") !== null
      ? localStorage.getItem("selectedTab")!
      : "acasa"
  );

  const [invoiceFilter, setInvoiceFilter] = useState<String | null>(null);

  const [incasari, setInacasari] = useState<UserEntity | null>(null);

  const [createUser, setCreateUser] = useState<boolean>(false);
  const [createPayment, setCreatePayment] = useState<boolean>(false);
  const incasariId = useSelector((state: any) => state.authentication.userId);

  const handleTabClick = (tab: String) => {
    setSelectedTab(tab);
    localStorage.setItem("selectedTab", tab.toString());
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof pagesIncasari>([]);

  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = () => {
    if (query !== "" && query !== " ") {
      const matchedPages = pagesIncasari.filter((page) =>
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
        name={incasari && incasari.name ? incasari.name : "ERROR"}
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
          {incasari && (
            <TopActionButtons
              photo={incasari.image}
              codClient={incasari.codClient}
              setSelectedTab={setSelectedTab}
              notifications={[]}
              setNotifications={() => {}}
            />
          )}
        </Box>
        {selectedTab === "acasa" && (
          <IncasariHome
            setSelectedTab={setSelectedTab}
            setInvoiceFilter={setInvoiceFilter}
            setCreateUser={setCreateUser}
            setCreatePayment={setCreatePayment}
          />
        )}
        {selectedTab === "plati" && (
          <IncasariPlati
            incasariId={incasari?.id}
            createPayment={createPayment}
            setCreatePayment={setCreatePayment}
          />
        )}
        {selectedTab === "facturi" && (
          <IncasariInvoices
            filter={invoiceFilter}
            setInvoiceFilter={setInvoiceFilter}
            createUser={createUser}
            setCreateUser={setCreateUser}
          />
        )}
        {selectedTab === "contor" && <IncasariContor />}
        {selectedTab === "setari" && (
          <SetariPage user={incasari} setUser={setInacasari} />
        )}
      </Box>
    </Box>
  );
};
