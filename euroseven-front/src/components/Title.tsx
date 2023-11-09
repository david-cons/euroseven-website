import { Box, Typography, Button } from "@mui/material";
import logo1 from "../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export const Title = (props: { role: string | null }) => {

  const {role} = props;
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
        height: "7vh",
        width: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      <img
        height="50px"
        src={logo1}
        alt="logo1"
        style={{
          padding: "10px",
          top: "50%",
          position: "absolute",
          margin: "0",
          transform: "translateY(-50%)",
        }}
      />
      <Box
        sx={{
          top: "50%",
          position: "absolute",
          margin: "0",
          transform: "translateY(-50%)",
          left: "15vh",
          textAlign: "left",
        }}
      >
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
          MyEuroSeven
        </Typography>

        <Typography
          variant="body1"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "Catesque" }}
        >
          Creează-ți cont MyEuroSeven si bucură-te de toate beneficiile oferite.
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          top: "50%",
          position: "absolute",
          margin: "0",
          transform: "translateY(-50%)",
          right: "1%",
          borderRadius: "20px",
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
