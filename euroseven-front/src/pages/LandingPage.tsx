import { Box, Button, Typography } from "@mui/material";
import "../App.css";
import { Title } from "../components/Title";
import { Jumbotron } from "../components/Jumbotron";
import { LandingSection1 } from "../components/LandingSection1";
import { LandingSection2 } from "../components/LandingSection2";
import { NewsSection } from "../components/NewsSection";
import { Footer } from "../components/Footer";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const role = useSelector((state: RootState) => state.authentication.role);
  const navigate = useNavigate();
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Title role={role} />
      <Box
        sx={{
          minHeight: "4vh",
          width: "100%",
          overflow: "auto",
          backgroundColor: "#0054a6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "1%",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: "25px",
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
              alignItems: "center",
              mr: "25px",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <PinDropIcon sx={{ color: "white", mr: "8px" }} />
            <Typography
              component="a"
              fontFamily={"Catesque"}
              onClick={() => navigate("/contact")}
              color={"white"}
              sx={{
                userSelect: "none",
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              Contact
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              borderRadius: "20px",
              backgroundColor: "white",
              color: "#0054a6",
              fontFamily: "Catesque",
              ":hover": {
                backgroundColor: "#0054a6",
                color: "white",
              },
              height: "23px",
              width: "130px",
              mr: "2px",
            }}
          >
            Înregistrare
          </Button>
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
