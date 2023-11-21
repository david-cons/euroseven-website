import { Box, Button, IconButton, Stack, styled } from "@mui/material";
import { LandingPageMenu } from "./LandingPageMenu";
import logo2 from "../assets/logo2.png";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const JumbotronOverlay = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsBoxVisible(!isBoxVisible);
    setIsOpen(!isOpen);
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          className="overlay-logo"
          sx={{
            width: "100%",
            display: "flex",
            "@media (max-height:600px)": {
              // Adjust 600px to the threshold you need
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              padding: "10px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/")}
          >
            <img
              height="100px"
              src={logo2}
              alt="logo2"
              className="overlay-logo"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            right: 0,
            top: 10,
          }}
        >
          <IconButton
            sx={{
              height: "30px",
              mr: "10px",
            }}
          >
            <PermIdentityIcon
              sx={{
                width: "30px",
                height: "35px",
                color: "#0054a6",
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              height: "30px",
              mr: "10px",
            }}
          >
            <SearchIcon
              sx={{
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
      </Box>

      <Box sx={{ width: "10%", mt: "4vh", pl: "25px" }}>
        <Stack direction="column" spacing={5}>
          {[
            "Clienți Casnici",
            "Clienti Business",
            "Servicii Online",
            "Informatii Utile",
            "Consultare Consum",
          ].map((buttonText) => (
            <AnimatedButton key={buttonText} variant="text">
              {buttonText}
            </AnimatedButton>
          ))}
        </Stack>
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
