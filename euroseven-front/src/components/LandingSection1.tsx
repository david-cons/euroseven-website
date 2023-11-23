import { LandingCard } from "./LandingCard";
import card1 from "../assets/card1.jpeg";
import card2 from "../assets/card2.jpeg";
import card4 from "../assets/card4.jpg";
import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
export const LandingSection1 = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F4F4F4",
        width: "80%",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        mt: "80px",
        position: "relative",
      }}
    >
      <Typography
        variant="body1"
        component="div"
        sx={{
          fontWeight: "bold",
          width: "50%",
          margin: "0 auto",
          mt: "25px",
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
              xl: 1800,
            },
          },
        })}
      >
        <Grid
          container
          spacing={{ xs: 5, sm: 5, md: 1, lg: 1, xl: 5 }}
          sx={{ margin: "0 auto" }}
        >
          <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
            <LandingCard
              image={card1}
              title={"Plăteşte Factura Online"}
              body={
                "Este simplu, rapid şi sigur să plăteşti online factura Euro7"
              }
              buttonText={"Plăteşte"}
            />
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
            <LandingCard
              image={card2}
              title={"Oferte"}
              body={
                "Descoperă ofertele noastre si bucură-te de servicii premium"
              }
              buttonText={"Vezi"}
            />
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
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
