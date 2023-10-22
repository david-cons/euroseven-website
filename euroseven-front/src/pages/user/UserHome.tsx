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
          <HomeCard
            title={"Sold"}
            data={`${user?.saldo!} RON`}
            icon={PaidOutlinedIcon}
          />
          <HomeCard
            title={"Rest de Plată"}
            data={`${user?.restDePlataTotal!} RON`}
            icon={PaymentIcon}
          />
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
          <IndexCard forIndexVechi={true} value={"24.833"} />
          <IndexCard forIndexVechi={false} value={"24.900"} />
        </Stack>
      </Box>
    </Box>
  );
};
