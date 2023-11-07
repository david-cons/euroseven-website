import { Title } from "../components/Title";
import information from "../assets/information.jpg";
import placeholder from "../assets/placeholder.png";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { JumbotronOverlay } from "../components/JumbotronOverlay";
import { Footer } from "../components/Footer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const InformationPage: React.FC = () => {
  return (
    <Box>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "white",
        }}
      >
        <Title />
      </Box>
      <Box
        className="jumbotron-container"
        sx={{
          width: "100%",
          height: "89vh",
          overflow: "hidden", // Prevent horizontal scrollbar
          position: "relative",
        }}
      >
        <img
          height="100%"
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
          }}
          draggable="false"
          unselectable="on"
        />
        <JumbotronOverlay />
        <Typography
          variant="h1"
          component="h1"
          fontFamily={"Catesque"}
          color="white"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          Titlu Informatie
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "160vh",
          background: "linear-gradient(to bottom,#FFFFFF,#dee2e6)",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "4vh",
          }}
        >
          <Typography variant="h3" component="h3" sx={{ color: "#0054a6" }}>
            Subtitlu 1
          </Typography>
          <Typography sx={{ color: "black", mt: "4vh" }}>
            Anticipăm mișcările pieței de energie și plasăm clienții în centrul
            inovațiilor noastre. ENGIE îți oferă soluții personalizate pentru
            furnizarea de gaze naturale cu formula de preț potrivită pentru a
            satisface cel mai bine nevoile tale. Cererile clienților noștri sunt
            unice, din acest motiv studiem diferite soluții în funcție de
            activitatea și de profilul lor.
          </Typography>
          <img
            src={placeholder}
            alt={"first"}
            height={"80%"}
            width={"70%"}
            style={{ marginTop: "4vh" }}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "25vh",
            mb: "20vh",
          }}
        >
          <Typography variant="h3" component="h3" sx={{ color: "#0054a6" }}>
            Subtitlu 1
          </Typography>
          <Box sx={{ mt: "5vh" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ textAlign: "left" }}
              >
                <Typography>
                  Vreau să închei un contract de energie online. Care sunt paşii
                  şi ce documente sunt necesare?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ textAlign: "left" }}>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ textAlign: "left" }}
              >
                <Typography>
                  Vreau să închei un contract de furnizare energie, însă nu am
                  contor. Ce trebuie să fac?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ textAlign: "left" }}>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ textAlign: "left" }}
              >
                <Typography>
                  Am contor și ENGIE este furnizorul meu, dar contractul nu este
                  pe numele meu. Cum pot schimba titularul contractului? Cum pot
                  schimba titularul contractului? Cum pot schimba titularul
                  contractului?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ textAlign: "left" }}>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ textAlign: "left" }}
              >
                <Typography>
                  Vreau o altă ofertă EuroSeven, mai potrivită nevoilor mele de
                  consum. Ce trebuie să fac?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ textAlign: "left" }}>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
