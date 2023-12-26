import { Title } from "../components/Title";

import {
  Box,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { JumbotronOverlay } from "../components/JumbotronOverlay";
import { Footer } from "../components/Footer";
import { useState } from "react";

import PersonPinIcon from "@mui/icons-material/PersonPin";
import InfoIcon from "@mui/icons-material/Info";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import NetworkWifi1BarIcon from "@mui/icons-material/NetworkWifi1Bar";
import RateReviewIcon from "@mui/icons-material/RateReview";
import BalanceIcon from "@mui/icons-material/Balance";
import { InfoUtile } from "../components/InfoUtile";
import { OfertaGazeNaturale } from "../components/OfertaGazeNaturale";
import { ActualizeDatePersonale } from "../components/ActualizareDatePersonale";
import { AutocitireIndex } from "../components/AutocitireIndex";
import { Revizie } from "../components/Revizie";
import { DrepturiSiObligatii } from "../components/DrepturiSiObligatii";
import clienticasnici from "../assets/clienticasnici.jpg"

export const ClientiCasniciPage: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "white",
        }}
      >
        <Title role={null} />
      </Box>
      <Box
        className="jumbotron-container"
        sx={{
          width: "100%",
          minHeight: "711px",
          overflow: "hidden", // Prevent horizontal scrollbar
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={clienticasnici}
          alt="jumbotron"
          style={{
            width: "100%", // Maintain aspect ratio and cover the container
            height: "100%",
            objectFit: "cover",
            position: "absolute", // Ensure images are absolutely positioned
            top: 0, // Position images at the top
            left: 0, // Position images at the left
            animation: "zoom-in 20s ease-in-out",
            flexShrink: 0,
          }}
          draggable="false"
          unselectable="on"
        />
        <JumbotronOverlay page={1} />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            fontFamily={"Catesque"}
            color="white"
          >
            Clienți Casnici
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "0.2px solid black",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          selectionFollowsFocus
          sx={{
            mb: "5px",
          }}
        >
          <Tab
            icon={<InfoIcon />}
            label="Informații Utile"
            sx={{ fontFamily: "Catesque" }}
          />
          <Tab
            icon={<GasMeterIcon />}
            label="Ofertă Gaze Naturale"
            sx={{ fontFamily: "Catesque" }}
          />
          <Tab
            icon={<PersonPinIcon />}
            label="Actualizare Date Personale"
            sx={{ fontFamily: "Catesque" }}
          />
          <Tab
            icon={<NetworkWifi1BarIcon />}
            label="Autocitire Index"
            sx={{ fontFamily: "Catesque" }}
          />
          <Tab
            icon={<RateReviewIcon />}
            label="Revizie"
            sx={{ fontFamily: "Catesque" }}
          />
          <Tab
            icon={<BalanceIcon />}
            label="Drepturi și Obligații"
            sx={{ fontFamily: "Catesque" }}
          />
        </Tabs>
      </Box>
      {value === 0 && <InfoUtile />}
      {value === 1 && <OfertaGazeNaturale />}
      {value === 2 && <ActualizeDatePersonale />}
      {value === 3 && <AutocitireIndex />}
      {value === 4 && <Revizie />}
      {value === 5 && <DrepturiSiObligatii />}
      <Footer />
    </Box>
  );
};
