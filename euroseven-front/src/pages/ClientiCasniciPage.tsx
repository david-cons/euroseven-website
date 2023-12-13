import { Title } from "../components/Title";
import information from "../assets/information.jpg";
import plafonare from "../assets/plafonare.jpg";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { JumbotronOverlay } from "../components/JumbotronOverlay";
import { Footer } from "../components/Footer";
import { useState } from "react";

import PersonPinIcon from '@mui/icons-material/PersonPin';
import InfoIcon from '@mui/icons-material/Info';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import NetworkWifi1BarIcon from '@mui/icons-material/NetworkWifi1Bar';
import RateReviewIcon from '@mui/icons-material/RateReview';
import BalanceIcon from '@mui/icons-material/Balance';
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import mdp from "../assets/mdp.jpg";

export const ClientiCasniciPage: React.FC = () => {

  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (hover: boolean) => {
    setIsHovered(hover);
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
          src={information}
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
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          selectionFollowsFocus
          sx={{
            mb: "5px",
          }}
        >
          <Tab icon={<InfoIcon />} label="Informații Utile" sx={{ fontFamily: "Catesque" }} />
          <Tab icon={<GasMeterIcon />} label="Ofertă Gaze Naturale" sx={{ fontFamily: "Catesque" }} />
          <Tab icon={<PersonPinIcon />} label="Actualizare Date Personale" sx={{ fontFamily: "Catesque" }} />
          <Tab icon={<NetworkWifi1BarIcon />} label="Autocitire Index" sx={{ fontFamily: "Catesque" }} />
          <Tab icon={<RateReviewIcon />} label="Revizie" sx={{ fontFamily: "Catesque" }} />
          <Tab icon={<BalanceIcon />} label="Drepturi și Obligații" sx={{ fontFamily: "Catesque" }} />
        </Tabs>
      </Box>
      <Box sx={{
        width: "100%",
        height: "1200px",
        background: "linear-gradient(to bottom,#FFFFFF,#dee2e6)",
        mt: "50px",
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      }}>
        {/*Plafonare Tab */}
        <Box sx={{
          width: "80%",
          margin: "0 auto",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            textAlign: "left",
            justifyContent: "left",
            gap: "10px"
          }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "6px",
                  height: "50px",
                  backgroundColor: "#0054a6",
                  mr: "15px",
                }}
              />
              <Typography fontFamily={"Catesque"} fontSize={"2rem"}>
                Plafonare
              </Typography>
            </Box>
            <Typography fontFamily={"Catesque"} fontSize={"1rem"} sx={{ mb: "10px" }}>
              În conformitate cu prevederile OUG nr.27/2022, pentru consumul înregistrat în perioada 1 aprilie 2022 – 31 martie 2025, prețul final facturat al gazelor naturale va fi plafonat la cel mult:
            </Typography>
            <Box sx={{ display: "flex" }}>
              <CheckBoxIcon sx={{ color: "green", mr: "10px" }} />
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                color={"black"}
              >
                0,31 lei/kWh, cu TVA inclus, pentru toți clienții casnici, indiferent de consumul acestora;
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <CheckBoxIcon sx={{ color: "green", mr: "10px" }} />
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                color={"black"}
              >
                0,37 lei/kWh, cu TVA inclus, pentru clienții noncasnici al căror consum în anul precedent nu a depășit 50.000 MWh;
              </Typography>
            </Box>
            <Button variant="contained" sx={{ height: "40px", fontFamily: "Catesque", mt: "10px", width: "200px" }}>
              Află mai Mult &gt;
            </Button>
          </Box>
          <Box onMouseOver={() => handleHover(true)} onMouseLeave={() => handleHover(false)} sx={{ position: "relative", width: "400px", height: "300px", display: "inline-block", transition: 'width 0.5s ease' }}>
            <img src={plafonare} alt="plafonare" style={{ width: '100%', height: '100%' }} />
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: isHovered ? '100%' : '40%',
              borderTop: '5px solid #0054a6',
              boxSizing: 'border-box',
              transition: 'width 0.5s ease'
            }} />
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: isHovered ? '100%' : '40%',
              borderRight: '5px solid #0054a6',
              boxSizing: 'border-box',
              transition: 'height 0.5s ease'
            }} />
          </Box>
        </Box>
        {/*Modalitatii De Plata Tab */}
        <Box sx={{
          width: "80%",
          margin: "0 auto",
          height: "475px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#dee2e6",
          gap: "25px"
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            textAlign: "right",
            justifyContent: "right",
            gap: "10px",
          }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "6px",
                  height: "50px",
                  backgroundColor: "#0054a6",
                  mr: "15px",
                }}
              />
              <Typography fontFamily={"Catesque"} fontSize={"2rem"}>
                Modalități de Plată
              </Typography>
            </Box>
            <Box onMouseOver={() => handleHover(true)} onMouseLeave={() => handleHover(false)} sx={{ position: "relative", width: "470px", height: "300px", display: "inline-block", transition: 'width 0.5s ease', mt: "10px" }}>
              <img src={mdp} alt="modalitati-de-plata" style={{ width: '100%', height: '100%' }} />
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: isHovered ? '100%' : '40%',
                borderTop: '5px solid #0054a6',
                boxSizing: 'border-box',
                transition: 'width 0.5s ease'
              }} />
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: isHovered ? '100%' : '40%',
                borderRight: '5px solid #0054a6',
                boxSizing: 'border-box',
                transition: 'height 0.5s ease'
              }} />
            </Box>
          </Box>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "30%",
          }}>
            <Typography fontFamily={"Catesque"} fontSize={"1rem"} sx={{ mb: "10px" }}>
              Fie că preferi să faci plățile online sau preferi alte metode, îți punem la dispoziție mai multe variante pentru ca ție să îți fie cât mai ușor să achiți factura ta de gaze naturale. Alege modalitatea de plată care se potrivește cel mai bine nevoilor tale.
            </Typography>
            <Button variant="contained" sx={{ height: "40px", fontFamily: "Catesque", mt: "10px", width: "200px" }}>
              Află mai Mult &gt;
            </Button>
          </Box>
        </Box>

      </Box >
      <Footer />
    </Box >
  );
};
