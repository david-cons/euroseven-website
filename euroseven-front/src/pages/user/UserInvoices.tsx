import { Box, Typography } from "@mui/material";
import { UserEntity } from "../../types";
import { UserInvoicesTable } from "../../components/client/UserInvoicesTable";
import { useEffect } from "react";
import { InvoiceService } from "../../services/InvoiceService";

export const UserInvoices: React.FC<{
  user: UserEntity | null;
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}> = ({ user, setSelectedTab }) => {
  return (
    <Box sx={{ width: "100%", margin: "0 auto" }}>
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
          Facturi
        </Typography>
      </Box>

      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <Box
          sx={{
            width: "100%",
            height: "50px",
            background: "#efefef",
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "50%", margin: "0 auto" }}>
            <Typography sx={{ color: "black", fontSize: "1rem" }}>
              Restul tău de plată este:{" "}
              {user && user.restDePlataTotal && user.restDePlataTotal > 0 ? (
                <b style={{ color: "red" }}>
                  {user && user.restDePlataTotal
                    ? `${user.restDePlataTotal.toFixed(2)} RON`
                    : `0.00 RON`}
                </b>
              ) : (
                <b style={{ color: "green" }}>0.00 RON</b>
              )}
            </Typography>
          </Box>
        </Box>

        <UserInvoicesTable
          codClient={user && user.codClient ? user.codClient : 0}
          setSelectedTab={setSelectedTab}
        />
      </Box>
    </Box>
  );
};
