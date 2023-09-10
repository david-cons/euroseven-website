import { Box, Typography, Button } from "@mui/material";

export const NewsCard = () => {
  return (
    <Box
      sx={{
        width: "30vh",
        height: "60vh",
        backgroundColor: "white",
        mr: "5vh",
        borderBottom: "5px solid #0054a6",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)",
        textAlign: "left",
        alignItems: "center",
        position: "relative",
        transition: "transform 0.2s", // Add a smooth transition on hover
        "&:hover": {
          transform: "scale(1.05)", // Grow by 5% on hover
        },
      }}
    >
      <Typography
        variant="subtitle1"
        component="div"
        sx={{
          fontWeight: "bold",
          color: "#0054a6",
          padding: "25px",
          display: "flex",
        }}
      >
        Noutati
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ ml: "5px", color: "gray" }}
        >
          | 25/09/2023
        </Typography>
      </Typography>
      <Typography
        variant="body1"
        component="div"
        sx={{
          pl: "25px",
          pr: "25px",
          fontWeight: "bold",
          pb: "25px",
          letterSpacing: "0px",
        }}
      >
        Vineri, 8 septembrie, clienții EuroSeven Romania au la dispoziție
        canalele online de interacțiune
      </Typography>
      <Typography
        variant="body1"
        component="div"
        sx={{
          pl: "25px",
          pr: "25px",
        }}
      >
        Centrele de relaţii cu clienţii ale EuroSeven Romania vor fi închise
        vineri, 8 septembrie, cu excepția punctului de vânzare EuroSeven din
        Băneasa Shopping City din București, care va funcționa conform
        programului obișnuit al centrului comercial.
      </Typography>
      <Button
        variant="contained"
        sx={{ margin: "25px", position: "absolute", bottom: 0 }}
      >
        Detalii
      </Button>
    </Box>
  );
};
