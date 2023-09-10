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
        width: "170vh",
        height: "80vh",
        margin: "0 auto",
        mt: "10vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        PLATFORMĂ CLIENȚI
      </Typography>
      <Box
        sx={{
          width: "140vh",
          height: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ float: "left", ml: "5vh" }}>
          <Icon MUIIcon={PhonelinkOutlinedIcon} color={"#b764d8"} />
          <Icon MUIIcon={LanguageIcon} color={"#feb155"} />
          <Icon MUIIcon={ReceiptLongOutlinedIcon} color={"#39dcb1"} />
        </Box>
        <Box sx={{ float: "left", ml: "5vh", mt: "2vh" }}>
          <Box sx={{ mb: "30px" }}>
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#0054a6",
                paddingBottom: "10px",
              }}
            >
              Transmitere Index
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: "#0054a6",
              }}
            >
              Puteți transmite index-ul consumului online
            </Typography>
          </Box>
          <Box sx={{ mb: "30px" }}>
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#0054a6",
                paddingBottom: "10px",
              }}
            >
              Facturi
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: "#0054a6",
              }}
            >
              Facturile emise sunt disponibile în secțiunea Contul meu
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#0054a6",
                paddingBottom: "10px",
              }}
            >
              Plăți Efectuate
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: "#0054a6",
              }}
            >
              Puteți vedea plățile efectuate și cele scadente
            </Typography>
          </Box>
        </Box>
        <Box sx={{ float: "right", padding: "50px", mt: "20px" }}>
          <img
            height="600px"
            width="600px"
            src={platformaclienti1}
            alt="platformaclienti"
            style={{
              padding: "10px",
              top: "50%",
              position: "absolute",
              transform: "translateY(-50%)",
              marginTop: "75px",
              marginLeft: "50px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
