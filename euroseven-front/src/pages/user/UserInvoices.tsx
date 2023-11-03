import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  styled,
} from "@mui/material";
import { UserEntity } from "../../types";
import { UserInvoicesTable } from "../../components/client/UserInvoicesTable";
import { useState } from "react";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

export const UserInvoices: React.FC<{
  user: UserEntity | null;
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}> = ({ user, setSelectedTab }) => {
  const [filter, setFilter] = useState("Toate");
  const handleChange = (event: SelectChangeEvent) => {
    const currentFilter = event.target.value as string;
    setFilter(event.target.value as string);
  };

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
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "50%",
              margin: "0 auto",
            }}
          >
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
            <Select
              value={filter}
              onChange={handleChange}
              IconComponent={() => (
                <ArrowDropDownIcon style={{ color: "#0054a6" }} />
              )}
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                height: "25px",
                mr: "25px",
                width: "140px",
                "& .MuiInputBase-input": {
                  color: "black", // Text color
                  fontFamily: "Catesque", // Font family
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0054a6",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0054a6", // Hover border color
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0054a6", // Focused border color
                },
              }}
            >
              <MenuItem value={"Toate"} sx={{ fontFamily: "Catesque" }}>
                Toate
              </MenuItem>
              <MenuItem value={"Restante"} sx={{ fontFamily: "Catesque" }}>
                Restante
              </MenuItem>
              <MenuItem value={"Plătite"} sx={{ fontFamily: "Catesque" }}>
                Plătite
              </MenuItem>
            </Select>
          </Box>
        </Box>

        <UserInvoicesTable
          codClient={user && user.codClient ? user.codClient : 0}
          setSelectedTab={setSelectedTab}
          filter={filter}
        />
      </Box>
    </Box>
  );
};

