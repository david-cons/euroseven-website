import { Paper, Typography, Box } from "@mui/material";
import { RecentPaymentsTable } from "./RecentPaymentsTable";
import { PaymentEntity, UserEntity } from "../../types";

interface PlatiRecenteCardProps {
  user: UserEntity | null;
  recentPayments: PaymentEntity[] | null;
}

export const PlatiRecenteCard: React.FC<PlatiRecenteCardProps> = ({
  user,
  recentPayments,
}) => {
  return (
    <Paper
      elevation={5}
      className="card-single"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        background: "white",
        padding: "2rem",
        width: "675px", // Adjust width based on screen size
        height: "250px", // Adjust height based on screen size
        borderRadius: "12px",
        boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.3)",
        border: "0.1px solid #e0e0e0",
        position: "relative",
      }}
    >
      <Typography
        fontFamily={"Catesque"}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: "20px",
          textTransform: "uppercase",
        }}
      >
        Plăți Recente
      </Typography>
      <Box
        sx={{
          width: "5vh",
          height: "0.5vh",
          background: "#0054a6",
          position: "absolute",
          top: "14%",
          left: "2.75%",
          borderRadius: "10px",
        }}
      />
      {user && <RecentPaymentsTable recentPayments={recentPayments} />}
    </Paper>
  );
};
