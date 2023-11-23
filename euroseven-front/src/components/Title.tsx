import { Box, Typography, Button } from "@mui/material";
import logo1 from "../assets/logo1.png";
import { useNavigate } from "react-router-dom";
export const Title = (props: { role: string | null }) => {
  const { role } = props;
  const navigate = useNavigate();

  const intraInCont = () => {
    if (role) {
      if (role === "ROLE_ADMIN") {
        navigate("/admin/home");
      } else if (role === "ROLE_INCASARI") {
        navigate("/incasari/home");
      } else if (role === "ROLE_USER") {
        navigate("/client/home");
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <Box
      sx={{
        minHeight: "50px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          textAlign: "left",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            "@media (max-height:600px)": {
              // Adjust 600px to the threshold you need
              display: "none",
            },
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo1}
            alt="logo1"
            style={{
              height: "50px",
              padding: "10px",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", ml: "20px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
              color: "#0054a6",
              fontFamily: "Catesque",
            }}
          >
            MySeven
          </Typography>

          <Typography
            variant="body1"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Catesque",
              "@media (max-width:800px)": {
                // Adjust 600px to the threshold you need
                display: "none",
              },
            }}
          >
            Creează-ți cont MySeven si bucură-te de toate beneficiile oferite.
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          borderRadius: "20px",
          mr: "20px",
          backgroundColor: "#0054a6",
          "&:hover": {
            backgroundColor: "#0054a6",
          },
          fontFamily: "Catesque",
        }}
        onClick={intraInCont}
      >
        Intra in Cont
      </Button>
    </Box>
  );
};
