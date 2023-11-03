import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Icon } from "../../components/Icon";
import { PaymentEntity, UserEntity } from "../../types";
import { useEffect, useState } from "react";
import { InvoiceService } from "../../services/InvoiceService";
import { RecentPaymentsTable } from "../../components/client/RecentPaymentsTable";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import DescriptionIcon from "@mui/icons-material/Description";
import test1 from "../../assets/test1.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IndexCard } from "../../components/client/IndexCard";
import { PlatiRecenteCard } from "../../components/client/PlatiRecenteCard";
import { HomeCard } from "../../components/client/HomeCard";

export const UserHome: React.FC<{
  user: UserEntity | null;
  recentPayments: PaymentEntity[] | null;
}> = ({ user, recentPayments }) => {
  const [countUnpaidInvoices, setCountUnpaidInvoices] = useState<number>(0);

  useEffect(() => {
    if (user) {
      const fetchUnpaidInvoices = async () => {
        await InvoiceService.getCountUnpaidInvoices(user?.codClient!)
          .then((res) => {
            setCountUnpaidInvoices(res);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchUnpaidInvoices();
    }
  }, [user]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "10vh",
          background: "linear-gradient(to right,#006dee, #014bd0, #00249e)",
          position: "absolute",
          top: "10%",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Typography
          fontFamily={"Catesque"}
          sx={{ color: "white", fontSize: "2rem" }}
        >
          Bine ai revenit!
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "89vh",
          position: "absolute",
          background: "linear-gradient(to bottom,#FFFFFF,#dee2e6)",
          top: "20%",
        }}
      >
        <img
          src={test1}
          height={"100%"}
          width={"100%"}
          alt="home"
          style={{ objectFit: "cover", opacity: "1" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: "20vh",
        }}
      >
        <Stack direction="row" spacing={10}>
          <Paper
            elevation={5}
            className="card-single"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              background: "white",
              padding: "2rem",
              width: "647px", // Adjust width based on screen size
              height: "100px", // Adjust height based on screen size
              borderRadius: "12px",
              boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.3)",
              border: "0.1px solid #e0e0e0",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
              position: "relative",
            }}
          >
              <Typography
                fontFamily={"Catesque"}
                sx={{ color: "#9499a2", textTransform: "uppercase", margin: "0 auto" }}
              >
                {"Rest de Plată"}
              </Typography>
              <Box
                sx={{
                  padding: "20px",
                  position: "absolute",
                  left: "0",
                  top: "35px",
                }}
              >
                <Box>
                  <Typography
                    fontFamily={"Catesque"}
                    sx={{
                      color: "#black",
                      fontSize: "2rem",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {`${user?.restDePlataTotal!} RON`}
                  </Typography>
                </Box>
              </Box>
            <Box sx={{ mt: "10px" }}>
              <Icon
                MUIIcon={PaymentIcon}
                color={Number(user?.restDePlataTotal!) < 0 ? "green" : "red"}
              />
            </Box>
            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                fontFamily: "Catesque",
                textTransform: "none",
                position: "absolute",
                bottom: -15,
                right: -10,
                borderRadius: "15px",
                margin: "15px",
                color: "black",
              }}
            >
              Vezi Detalii
            </Button>
          </Paper>
          <HomeCard
            title={"Facturi Restante"}
            data={countUnpaidInvoices}
            icon={DescriptionIcon}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          sx={{
            mt: "3vh",
          }}
        >
          <PlatiRecenteCard user={user} recentPayments={recentPayments} />
          <IndexCard forIndexVechi={true} value={user?.indexVechi!} />
          <IndexCard forIndexVechi={false} value={user?.indexNou!} />
        </Stack>
      </Box>
    </Box>
  );
};
