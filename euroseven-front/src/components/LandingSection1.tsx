import { LandingCard } from "./LandingCard";
import card1 from "../assets/card1.jpeg";
import card2 from "../assets/card2.jpeg";
import card4 from "../assets/card4.jpg";
import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
export const LandingSection1 = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F4F4F4",
        width: "80%",
        minWidth: "600px",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        mt: "10vh",
        justifyContent: "space-between",
        minHeight: "40vh",
      }}
    >
      <Typography
        variant="body1"
        component="div"
        sx={{
          fontWeight: "bold",
          width: "50%",
          margin: "0 auto",
        }}
      >
        DESCOPERA OFERTELE DEDICATE
      </Typography>
      <ThemeProvider
        theme={createTheme({
          breakpoints: {
            values: {
              xs: 300,
              sm: 640,
              md: 1000,
              lg: 1600,
              xl: 2000,
            },
          },
        })}
      >
        <Grid
          container
          spacing={5}
          sx={{ margin: "0 auto", mb: "5vh", mr: "10vh" }}
        >
          <Grid xs={4} md={12} lg={4} sx={{ mr: "10px" }}>
            <LandingCard
              image={card1}
              title={"Plăteşte Factura Online"}
              body={
                "Este simplu, rapid şi sigur să plăteşti online factura Euro7"
              }
              buttonText={"Plăteşte"}
            />
          </Grid>
          <Grid xs={"auto"} md={12} lg={4} sx={{ mr: "10px", ml: "10px" }}>
            <LandingCard
              image={card2}
              title={"Oferte"}
              body={
                "Descoperă ofertele noastre si bucură-te de servicii premium"
              }
              buttonText={"Vezi"}
            />
          </Grid>
          <Grid xs={"auto"} md={12} lg={4} sx={{ mr: "10px" }}>
            <LandingCard
              image={card4}
              title={"Infomații Suplimentare"}
              body={"Află răspunsurile la cele mai frecvente întrebări"}
              buttonText={"Vezi"}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
};
