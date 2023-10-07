import { Box, Typography } from "@mui/material";
import "../App.css";
import { Title } from "../components/Title";
import { Jumbotron } from "../components/Jumbotron";
import { LandingSection1 } from "../components/LandingSection1";
import { LandingSection2 } from "../components/LandingSection2";
import { NewsSection } from "../components/NewsSection";
import { Footer } from "../components/Footer";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

export const LandingPage = () => {
  return (
    <Box>
      <Title />
      <Box
        sx={{
          height: "4vh",
          width: "100%",
          position: "relative",
          backgroundColor: "#0054a6",
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "1%",
            transform: "translateY(-50%)",
          }}
        >
          <PhoneAndroidOutlinedIcon sx={{ color: "white", mr: "8px" }} />
          <Typography
            component="a"
            fontFamily={"Catesque"}
            color={"white"}
            sx={{
              userSelect: "none",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            031 67 56
          </Typography>
        </Box>
        
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "10%",
            transform: "translateY(-50%)",
          }}
        >
          <CreditCardOutlinedIcon sx={{ color: "white", mr: "8px" }} />
          <Typography
            component="a"
            fontFamily={"Catesque"}
            color={"white"}
            sx={{
              userSelect: "none",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            Plătește Factura
          </Typography>
        </Box>
      </Box>
      <Jumbotron />
      <LandingSection1 />
      <LandingSection2 />
      <NewsSection />
      <Footer />
    </Box>
  );
};
