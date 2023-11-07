import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import illustration2 from "../assets/illustration2.png";

export const CustomErrorPage: React.FC = () => {
  const navigate = useNavigate(); // For navigation

  const goBack = () => {
    navigate("/");
  };
  return (
    <Box sx={{ position: "relative", height: "100vh", width: "200vh" }}>
      <Typography variant={"h1"} fontFamily={"Catesque"}>
        500 - Server Indisponibil!
      </Typography>
      <Typography component={"p"} fontFamily={"Catesque"}>
        Scuze, site-ul nu este disponibil momentan.
      </Typography>
      <Button
        onClick={goBack}
        style={{ fontFamily: "Catesque", textDecoration: "underline" }}
      >
        Apăsați aici pentru a reveni la pagina principală.
      </Button>
      <img
        alt="illustration"
        src={illustration2}
        height={"500px"}
        width={"675px"}
        style={{
          position: "absolute",
          bottom: 0,
          right: "50%",
          transform: "translateX(50%)",
        }}
      />
    </Box>
  );
};
