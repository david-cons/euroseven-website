import React from "react";
import illustration2 from "../assets/illustration2.png";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate(); // For navigation

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Box sx={{ position: "relative", height: "100vh", width: "200vh" }}>
      <Typography variant={"h1"} fontFamily={"Catesque"}>
        404 - Nu Există!
      </Typography>
      <Typography component={"p"} fontFamily={"Catesque"}>
        Scuze, pagina pe care ați căutat-o nu există.
      </Typography>
      <Button
        onClick={goBack}
        style={{ fontFamily: "Catesque", textDecoration: "underline" }}
      >
        Apăsați aici pentru a reveni la pagina anterioară.
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
