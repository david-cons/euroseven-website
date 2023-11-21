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
          display: "flex", // Use flexbox to layout child elements
          alignItems: "center", // Vertically center the child elements
          justifyContent: "flex-start", // Align children to the start of the container
          px: "1%", // Add padding on the left and right sides
          boxSizing: "border-box", // Include padding in the width calculation
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: "25px", // Add margin to the right of the first box
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
      <Jumbotron />
      <LandingSection1 />
      <LandingSection2 />
      <NewsSection />
      <Footer />
    </Box>
  );
};
