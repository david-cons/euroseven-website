import { useEffect, useState } from "react";
import { NotificationEntity, PaymentEntity, UserEntity } from "../../types";
import { useSelector } from "react-redux";
import { UserService } from "../../services/UserService";
import {
  Box,
  Chip,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { SidebarUser } from "../../components/client/SidebarUser";
import Search from "@mui/icons-material/Search";
import { SetariPage } from "../SetariPage";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { UserHome } from "./UserHome";
import { UserInvoices } from "./UserInvoices";
import { InvoiceService } from "../../services/InvoiceService";
import { UserContor } from "./UserContor";
import { TopActionButtons } from "../../components/TopActionButtons";
import { NotificationService } from "../../services/NotificationService";
import { ModalParola } from "../../components/client/ModalParola";
import { UserConsum } from "./UserConsum";
import { UserContract } from "./UserContract";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { pagesClient } from "../../lunrjs/dataAdmin";

export const UserHomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<String>(
    localStorage.getItem("selectedTab") !== null
      ? localStorage.getItem("selectedTab")!
      : "acasa"
  );

  const [user, setUser] = useState<UserEntity | null>(null);

  const [recentPayments, setRecentPayments] = useState<PaymentEntity[]>([]);
  const [notifications, setNotifications] = useState<NotificationEntity[]>([]);

  const [isDefaultPassword, setIsDefaultPassword] = useState<Boolean>(false);

  const query = new URLSearchParams(window.location.search);

  const userId = useSelector((state: any) => state.authentication.userId);

  const [openChat, setOpenChat] = useState<Boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<typeof pagesClient>([]);
  const [openSearch, setOpenSearch] = useState<Boolean>(false);

  const handleSearch = () => {
    if (searchQuery !== "" && searchQuery !== " ") {
      const matchedPages = pagesClient.filter((page) =>
        page.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setResults(matchedPages);
    } else {
      setResults([]);
    }
  };

  const handleClickSearch = () => {
    setOpenSearch(!openSearch);
  };

  const handleOpenChat = () => setOpenChat(true);
  const handleCloseChat = () => setOpenChat(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (isDefaultPassword === true) {
      //change to error snackbar
      console.log("Default Password");
    } else {
      setOpen(false);
    }
  };

  const handleTabClick = (tab: String) => {
    setSelectedTab(tab);
    localStorage.setItem("selectedTab", tab.toString());
  };

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      if (isMounted) {
        await UserService.getUserById(userId)
          .then((res) => {
            setUser(res);
            console.log(res);
            if (res.defaultPassword === true) {
              setIsDefaultPassword(true);
              handleOpen();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const payment = async () => {
      // Check to see if this is a redirect back from Checkout
      if (query.get("success")) {
        if (isMounted) {
          const nrFactura = query.get("factura");
          const invoice = await InvoiceService.getInvoiceByNrFactura(
            Number(nrFactura!)
          );
          if (invoice && invoice.restDePlata! > 0 && userId) {
            await InvoiceService.registerPayment({
              amount: invoice.restDePlata,
              userId: userId,
              nrFactura: Number(invoice.nrFactura),
              paymentMethod: "Card",
            });
            window.history.replaceState(null, "", window.location.pathname);
            fetchUser();
          }
        } else if (query.get("canceled")) {
          console.log("cancelled");
          window.history.replaceState(null, "", window.location.pathname);
        }
      } else if (query.get("canceled")) {
        console.log("cancelled");
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    payment();
    fetchUser();
    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted or a dependency changes
    };
  }, [query.get("success"), userId]);

  useEffect(() => {
    const fetchRecentPayments = async () => {
      if (user) {
        await InvoiceService.getLastPaymentsByCodClient(user.codClient!)
          .then((res) => {
            setRecentPayments(res);
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    const fetchNotifications = async () => {
      if (user?.codClient !== undefined) {
        await NotificationService.getAllUncompletedNotifications(
          user?.codClient
        ).then((res) => {
          setNotifications(res);
        });
      }
    };
    fetchRecentPayments();
    fetchNotifications();
  }, [user]);

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
      <SidebarUser
        handleTabChange={handleTabClick}
        selectedTab={selectedTab}
        name={user && user.name ? user.name : "ERROR"}
        codClient={user && user.codClient ? user.codClient : 0}
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
          overflowY: "hidden",
        }}
      >
        {isDefaultPassword && userId && (
          <ModalParola
            open={open}
            handleClose={handleClose}
            userId={userId}
            setUser={setUser}
            setIsDefaultPassword={setIsDefaultPassword}
          />
        )}
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
                value={searchQuery}
                size="small"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
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
                {searchQuery &&
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

          {user && (
            <TopActionButtons
              photo={user.image}
              codClient={user.codClient}
              setSelectedTab={setSelectedTab}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
        </Box>

        {selectedTab === "acasa" && (
          <UserHome user={user} recentPayments={recentPayments} />
        )}
        {selectedTab === "facturi" && (
          <UserInvoices setSelectedTab={setSelectedTab} user={user} />
        )}
        {selectedTab === "contract" && <UserContract />}
        {selectedTab === "contor" && <UserContor user={user} />}
        {selectedTab === "consum" && <UserConsum />}
        {selectedTab === "ajutor" && <h1>Ajutor</h1>}
        {selectedTab === "setari" && (
          <SetariPage user={user} setUser={setUser} />
        )}
        <Fab
          color="primary"
          aria-label="chat"
          size="large"
          onClick={handleOpenChat}
          sx={{
            position: "fixed",
            bottom: "2%",
            right: "2%",
            zIndex: 1,
          }}
        >
          <WhatsAppIcon />
        </Fab>
        {openChat && (
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              right: 20,
              width: "450px",
              height: "600px",
              zIndex: 3000,
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "15%",
                justifyContent: "space-between",
                background: "#0054a6",
                borderRadius: "10px 10px 0 0",
                boxSizing: "border-box",
                alignItems: "center",
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                color="white"
                fontSize={"1.2rem"}
                sx={{ ml: "10px" }}
              >
                Bine ai venit la Buddy Euro7!
              </Typography>
              <IconButton onClick={handleCloseChat} sx={{ mr: "10px" }}>
                <ArrowDropDownIcon
                  style={{ color: "white" }}
                  sx={{ width: "30px", height: "30px" }}
                />
              </IconButton>
            </Box>
            <Box
              sx={{
                height: "10%",
                width: "70%",
                border: "1px solid black",
                borderRadius: "0 10px 10px 10px", // top-left, top-right, bottom-right, bottom-left
                mt: "25px",
                ml: "25px",
                alignItems: "center",
                display: "flex",
                textAlign: "left",
              }}
            >
              <Typography fontFamily={"Catesque"} sx={{ padding: "10px" }}>
                Buna! Sunt Buddy Euro Seven 🤖, un chatbot care asista relatiile
                cu clienti!
              </Typography>
            </Box>
            <Box
              sx={{
                height: "10%",
                width: "70%",
                border: "1px solid black",
                borderRadius: "0 10px 10px 10px", // top-left, top-right, bottom-right, bottom-left
                mt: "10px",
                ml: "25px",
                alignItems: "center",
                display: "flex",
                textAlign: "left",
              }}
            >
              <Typography fontFamily={"Catesque"} sx={{ padding: "10px" }}>
                Daca doriti ajutor personalizat va rog sunati la nr 0316756.
              </Typography>
            </Box>
            <Box
              sx={{
                height: "10%",
                width: "70%",
                border: "1px solid black",
                borderRadius: "0 10px 10px 10px", // top-left, top-right, bottom-right, bottom-left
                mt: "10px",
                ml: "25px",
                alignItems: "center",
                display: "flex",
                textAlign: "left",
              }}
            >
              <Typography fontFamily={"Catesque"} sx={{ padding: "10px" }}>
                Cunostiintele mele sunt limitate la subiectele de mai jos.
              </Typography>
            </Box>

            <Box
              sx={{
                height: "20%",
                width: "80%",
                display: "flex",
                mt: "10px",
                ml: "25px",
                flexWrap: "wrap",
              }}
            >
              <Chip
                label="Contract"
                sx={{
                  fontFamily: "Catesque",
                  fontWeight: "bold",
                  height: "50px",
                  width: "100px",
                  mr: "10px",
                }}
              />
              <Chip
                label="Factura"
                sx={{
                  fontFamily: "Catesque",
                  fontWeight: "bold",
                  height: "50px",
                  width: "100px",
                  mr: "10px",
                }}
              />
              <Chip
                label="Plata"
                sx={{
                  fontFamily: "Catesque",
                  fontWeight: "bold",
                  height: "50px",
                  width: "100px",
                  mr: "10px",
                }}
              />
              <Chip
                label="Contor"
                sx={{
                  fontFamily: "Catesque",
                  fontWeight: "bold",
                  height: "50px",
                  width: "100px",
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
