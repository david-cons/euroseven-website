import { Card } from "../components/Card";
import card1 from "../assets/card1.jpeg";
import card2 from "../assets/card2.jpeg";
import card4 from "../assets/card4.jpg";
import { Box, Typography } from "@mui/material";

export const LandingSection1 = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F4F4F4",
        width: "170vh",
        height: "45vh",
        margin: "0 auto",
        mt: "10vh",
        position: "relative",
        display: "flex",
      }}
    >
      <Typography
        variant="body1"
        component="div"
        sx={{
          fontWeight: "bold",
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px",
        }}
      >
        DESCOPERA OFERTELE DEDICATE
      </Typography>

      <Box
        sx={{
          width: "50vh",
          height: "25vh",
          mt: "7vh",
          display: "flex",
          padding: "25px",
          ml: "2vh",
        }}
      >
        <Card
          image={card1}
          title={"Plăteşte Factura Online"}
          body={"Este simplu, rapid şi sigur să plăteşti online factura Euro7"}
          buttonText={"Plăteşte"}
        />
        <Card
          image={card2}
          title={"Oferte"}
          body={
            "Descoperă ofertele noastre si bucură-te de servicii premium la prețuri imbatabile."
          }
          buttonText={"Vezi"}
        />
        <Card
          image={card4}
          title={"Infomații Suplimentare"}
          body={
            "Află răspunsurile la cele mai frecvente întrebări, precum și alte informații utile."
          }
          buttonText={"Vezi"}
        />
      </Box>
    </Box>
  );
};
