import { Box, Button, IconButton, Stack, styled } from "@mui/material";
import { LandingPageMenu } from "./LandingPageMenu";
import logo2 from "../assets/logo2.png";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef } from "react";

export const JumbotronOverlay = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsBoxVisible(!isBoxVisible);
    setIsOpen(!isOpen);
  };
  return (
    <Box>
      <Box
        className="jumbotron-overlay"
        sx={{
          position: "absolute",
          top: "5%",
          left: "50%",
          width: "100%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          color: "#fff" /* Text color */,
          display: "flex",
        }}
      >
        <img height="100px" src={logo2} alt="logo2" />
      </Box>
      <Box
        sx={{
          mt: "15vh",
          position: "absolute",
          top: "10%",
          left: "1%",
          alignItems: "left",
          justifyContent: "left",
          textAlign: "left",
          display: "flex",
        }}
      >
        <Stack direction="column" spacing={5}>
          {[
            "Clienti Rezidentiali",
            "Clienti Business",
            "Electripedia",
            "Servicii Online",
            "Informatii Utile",
            "Plafonare",
          ].map((buttonText) => (
            <AnimatedButton key={buttonText} variant="text">
              {buttonText}
            </AnimatedButton>
          ))}
        </Stack>
      </Box>
      <Box sx={{ position: "absolute", right: 0, top: "0" }}>
        <IconButton>
          <PermIdentityIcon
            sx={{
              mr: "10px",
              width: "30px",
              height: "35px",
              color: "#0054a6",
            }}
          />
        </IconButton>
        <IconButton>
          <SearchIcon
            sx={{
              mr: "12px",
              width: "30px",
              height: "35px",
              color: "#0054a6",
            }}
          />
        </IconButton>
        <a
          id="menu-icon"
          className={isOpen ? "close" : ""}
          onClick={handleClick}
          style={{ zIndex: isOpen ? 2 : 1 }}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </a>
      </Box>

      {isBoxVisible && <LandingPageMenu boxRef={boxRef} isOpen={isOpen} />}
    </Box>
  );
};

const AnimatedButton = styled(Button)({
  "@keyframes flyInFromRight": {
    "0%": {
      opacity: 0,
      transform: "translateX(100%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
  fontWeight: "bold",
  color: "white",
  mr: "25px",
  animation: "flyInFromRight 1s ease-out forwards",
});
