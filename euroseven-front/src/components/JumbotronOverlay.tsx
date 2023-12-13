import { Box, Button, IconButton, Stack, styled } from "@mui/material";
import { LandingPageMenu } from "./LandingPageMenu";
import logo2 from "../assets/logo2.png";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const JumbotronOverlay = (props: { page: number }) => {
  const { page } = props;

  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsBoxVisible(!isBoxVisible);
    setIsOpen(!isOpen);
  };

  const clickButton = (url: string) => {
    navigate(url);
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

      <Box sx={{ width: "178px", mt: "4vh", pl: "25px" }}>
        <Stack direction="column" spacing={5}>
          {[
            "Clienți Casnici",
            "Clienti Business",
            "Servicii Online",
            "Informatii Utile",
            "Consultare Consum",
          ].map((buttonText, index) => (
            <AnimatedButton
              key={buttonText}
              variant="text"
              sx={{
                color: page === index + 1 ? "#0075e8" : "white",
              }}
              onClick={() =>
                clickButton(
                  `/${buttonText
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`
                )
              }
            >
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
  ":hover": {
    color: "#0075e8",
  },
  fontWeight: "bold",
  color: "white",
  mr: "25px",
  animation: "flyInFromRight 1s ease-out forwards",
  fontFamily: "Arial Black",
  whiteSpace: "nowrap",
});
