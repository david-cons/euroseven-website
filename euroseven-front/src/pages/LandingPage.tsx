import { Box } from "@mui/material";
import "../App.css";
import { Title } from "../components/Title";
import { Jumbotron } from "../components/Jumbotron";
import { LandingSection1 } from "../components/LandingSection1";
import { LandingSection2 } from "../components/LandingSection2";
import { NewsSection } from "../components/NewsSection";
import { Footer } from "../components/Footer";

export const LandingPage = () => {
  return (
    <Box>
      <Title />
      <Jumbotron />
      <LandingSection1 />
      <LandingSection2 />
      <NewsSection />
      <Footer />
    </Box>
  );
};
