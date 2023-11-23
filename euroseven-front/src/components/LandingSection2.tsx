import PhonelinkOutlinedIcon from "@mui/icons-material/PhonelinkOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { Icon } from "../components/Icon";
import platformaclienti1 from "../assets/platformaclienti1.png";
import { Box, Typography } from "@mui/material";

export const LandingSection2 = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F4F4F4",
        width: "80%",
        minHeight: "80vh",
        margin: "0 auto",
        mt: "10vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body1"
        component="div"
        sx={{
          fontWeight: "bold",
          paddingTop: "20px",
          "@media (max-width:800px)": {
            paddingBottom: "20px",
          },
        }}
      >
        PLATFORMĂ CLIENȚI
      </Typography>
      <Box
        sx={{
          width: "60%", // Changed from 140vh to 100% for better responsiveness
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // column on xs (extra-small) screens, row on md (medium) and above
          alignItems: "center",
          gap: 10, // Adds a gap between items
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "flex-start", md: "center" }, // flex-start on xs screens, center on md and above
            gap: 3, // Adds a gap between items
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Icon MUIIcon={PhonelinkOutlinedIcon} color={"#b764d8"} />
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#0054a6", paddingTop: "10px" }}
            >
              Transmitere Index
            </Typography>
            <Typography variant="body1" sx={{ color: "#0054a6" }}>
              Puteți transmite index-ul consumului online
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Icon MUIIcon={LanguageIcon} color={"#feb155"} />
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#0054a6",
                paddingTop: "10px",
              }}
            >
              Facturi
            </Typography>
            <Typography variant="body1" sx={{ color: "#0054a6" }}>
              Facturile emise sunt disponibile în secțiunea Contul meu
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Icon MUIIcon={ReceiptLongOutlinedIcon} color={"#39dcb1"} />
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#0054a6",
                paddingTop: "10px",
              }}
            >
              Plăți Efectuate
            </Typography>
            <Typography variant="body1" sx={{ color: "#0054a6" }}>
              Puteți vedea plățile efectuate și cele scadente
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: "20px",
            ml: "20px",
            "@media (max-width:1200px)": {
              display: "none",
            },
          }}
        >
          <img
            height="600px"
            width="600px"
            src={platformaclienti1}
            alt="platformaclienti"
            style={{
              paddingTop: "10px",
              marginTop: "75px",
              marginLeft: "20px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
