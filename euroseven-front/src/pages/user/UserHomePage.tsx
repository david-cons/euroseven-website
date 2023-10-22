import { useEffect, useState } from "react";
import { PaymentEntity, UserEntity } from "../../types";
import { useSelector } from "react-redux";
import { UserService } from "../../services/UserService";
import { Avatar, Box, Fab, IconButton } from "@mui/material";
import { SidebarUser } from "../../components/client/SidebarUser";
import Search from "@mui/icons-material/Search";
import { MaterialUISwitch } from "../../components/admin/MaterialUISwitch";
import { StyledBadge } from "../../components/admin/StyledBadge";
import { StyledAvatar } from "../../components/StyledAvatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { SetariPage } from "../SetariPage";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { UserHome } from "./UserHome";
import { UserInvoices } from "./UserInvoices";
import { InvoiceService } from "../../services/InvoiceService";

export const UserHomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<String>(
    localStorage.getItem("selectedTab") !== null
      ? localStorage.getItem("selectedTab")!
      : "acasa"
  );

  const [user, setUser] = useState<UserEntity | null>(null);

  const [recentPayments, setRecentPayments] = useState<PaymentEntity[]>([]);

  const query = new URLSearchParams(window.location.search);

  const userId = useSelector((state: any) => state.authentication.userId);

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
    fetchRecentPayments();
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
                src={`data:image/jpeg;base64,${user?.image}`}
              />
            </StyledAvatar>
          </Box>
        </Box>

        {selectedTab === "acasa" && (
          <UserHome user={user} recentPayments={recentPayments} />
        )}
        {selectedTab === "facturi" && (
          <UserInvoices setSelectedTab={setSelectedTab} user={user} />
        )}
        {selectedTab === "contract" && <h1>Contract</h1>}
        {selectedTab === "contor" && <h1>Citire Contor</h1>}
        {selectedTab === "consum" && <h1>Consum</h1>}
        {selectedTab === "ajutor" && <h1>Ajutor</h1>}
        {selectedTab === "setari" && (
          <SetariPage user={user} setUser={setUser} />
        )}
        <Fab
          color="primary"
          aria-label="chat"
          size="large"
          sx={{
            position: "fixed",
            bottom: "2%",
            right: "2%",
            zIndex: 1000,
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </Box>
    </Box>
  );
};
