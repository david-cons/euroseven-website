import { Title } from "../components/Title";
import information from "../assets/information.jpg";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import { JumbotronOverlay } from "../components/JumbotronOverlay";
import { Footer } from "../components/Footer";

export const ClientiCasniciPage: React.FC = () => {
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
          borderBottom: "1px solid black",
        }}
      >
        <Box
          sx={{
            margin: "0 auto",
            display: "flex",
            gap: "25px",
          }}
        >
          <Button variant="contained" sx={{ borderRadius: "20px" }}>
            Informații Utile
          </Button>
          <Button variant="contained" sx={{ borderRadius: "20px" }}>
            Informații Utile
          </Button>
          <Button variant="contained" sx={{ borderRadius: "20px" }}>
            Informații Utile
          </Button>
          <Button variant="contained" sx={{ borderRadius: "20px" }}>
            Informații Utile
          </Button>
          <Button variant="contained" sx={{ borderRadius: "20px" }}>
            Informații Utile
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
